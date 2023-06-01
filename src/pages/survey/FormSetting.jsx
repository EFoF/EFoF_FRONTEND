import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import 'react-chatbot-kit/build/main.css';
import './Chatbot.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toastMsg from '../../ui/Toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.scss';
import { getMonth, getYear } from 'date-fns';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { updateSurveyOpenDate, updateSurveyExpireDate, updateSurveyEmail, updateSurveyLogin, updateSurveyStat, updateSurveyParticipate, updateSurveyParticipateNum, updateSurveyGps, updateSurveyGpsValue, getSurveySetting } from '../../api/survey';
import Geocode from "react-geocode";
import SurveySettingHeader from './SurveySettingHeader';

const YEARS = Array.from({ length: 4 }, (_, i) => getYear(new Date()) + i);
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default function FormSetting() {
  const { id } = useParams();
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [address, setAddress] = useState('');
  const searchButtonRef = useRef(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const numbers = Array.from(['1km', '2km', '3km', '4km', '5km']);
  const [limit, setLimit] = useState(0);
  const [data, setData] = useState({});
  const [settingOptions, setSettingOptions] = useState({
    participate: false,
    gps: false,
    stat: false,
    email: false,
    login: false
  });

  Geocode.setApiKey("AIzaSyBCr3Corx6ubbMzoiTOzeed7B0RlsknD9s");
  Geocode.setLanguage("kr")
  Geocode.setRegion("kr");

  const handleParticipateToggle = (event) => {

    const data = {
      participate: event.target.checked
    }
    updateSurveyParticipate(id, data)

    setSettingOptions({ ...settingOptions, participate: event.target.checked });

  };

  const handleParticipateNumChange = (event) => {


    const data = {
      participate_num: Number(event.target.value)
    }
    updateSurveyParticipateNum(id, data)
  };

  const handleGPSToggle = (event) => {

    if (!event.target.checked) {
      const data = {
        gps: false
      }
      updateSurveyGps(id, data);
    }
    setSettingOptions({ ...settingOptions, gps: event.target.checked });
  };
  const handleStatToggle = (event) => {
    const data = {
      stat: event.target.checked
    }
    updateSurveyStat(id, data)

    setSettingOptions({ ...settingOptions, stat: event.target.checked });
  };
  const handleEmailToggle = (event) => {
    const data = {
      email: event.target.checked
    }
    updateSurveyEmail(id, data)
    setSettingOptions({ ...settingOptions, email: event.target.checked });

  };
  const handleLoginToggle = (event) => {
    const data = {
      login: event.target.checked
    }
    updateSurveyLogin(id, data)
    setSettingOptions({ ...settingOptions, login: event.target.checked });

  };
  const handleLimitChange = (event) => {
    const value = Number(event.target.value);

    if (value >= 0) {
      setLimit(value);
    } else {
      toastMsg('인원 수 제한에 음수를 입력할 수 없습니다.');
    }
  };

  const handleChange = (e) => {
    const data = {
      distance: e.target.value
    }
    updateSurveyGpsValue(id, data)
    setSelectedNumber(e.target.value);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);


    getSurveySetting(id)
      .then((response) => {
        setSelectedStartDate(new Date(response.open_date));
        setSelectedEndDate(new Date(response.expire_date));
        setData(response);
        setLimit(response.participate_num);
        setSettingOptions({
          participate: response.participate,
          gps: response.gps,
          stat: response.stat,
          email: response.email,
          login: response.login
        });
        Geocode.fromLatLng(response.latitude, response.longitude).then((res) => {
          setAddress(res.results[0].formatted_address)
          setSelectedNumber(response.distance)
        })
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const handleGPSSubmit = async (event) => {
    event.preventDefault();
    new window.daum.Postcode({
      oncomplete: async function (data) {

        setAddress(data.address);
        GoogleMap(data.address)
      },
    }).open();
  };
  const GoogleMap = async (currentAddr) => {


    return Geocode.fromAddress(currentAddr)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        alert(lat, lng);

        const data = {
          gps: true,
          latitude: lat,
          longitude: lng,
          distance: "1"
        }
        updateSurveyGps(id, data);
      })
      .catch(err => alert(err))
  }

  const handleStartDateChange = (date) => {
    const now = new Date();

    // 선택한 시작일(date)이 현재 시간(now)보다 이전인 경우
    if (date < now) {
      toastMsg("현재 시간 이전의 날짜를 선택할 수 없습니다.", false);
      return; // 이후 코드를 실행하지 않고 함수를 종료합니다.
    }
    if (date > selectedEndDate) {
      toastMsg("시작일은 종료일 이후가 될 수 없습니다.", false);
      return; // 이후 코드를 실행하지 않고 함수를 종료합니다.
    }
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(date.getTime() - timezoneOffset);
    const formattedDateTime = adjustedDate.toISOString();
    const data = {
      openDate: formattedDateTime
    }
    updateSurveyOpenDate(id, data)
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    const now = new Date();

    // 선택한 종료일(date)이 현재 시간(now)보다 이전인 경우
    if (date < now) {
      toastMsg("현재 시간 이전의 날짜를 선택할 수 없습니다.", false);
      return;
    }

    // 선택한 종료일(date)이 선택한 시작일(selectedStartDate)보다 이전인 경우
    if (date < selectedStartDate) {
      toastMsg("종료일은 시작일 이전이 될 수 없습니다.", false);
      return;
    }
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(date.getTime() - timezoneOffset);
    const formattedDateTime = adjustedDate.toISOString();
    // const formattedDateTime = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    // const selectedDate = LocalDateTime.parse(formattedDateTime); // ISO 8601 형식의 문자열로부터 LocalDateTime 객체로 변환
    // const dateString = date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    const data = {
      expireDate: formattedDateTime
    }
    updateSurveyExpireDate(id, data)
    setSelectedEndDate(date);
  };


  return (
    <>
      <SurveySettingHeader surveyId={id} />
      <Wrapper>
        <CalenderWrapper>
          <CalenderText>설문 시작일</CalenderText>
          <DatePicker
            className={styles.datePicker}
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeIntervals={60}
            timeFormat="HH:mm"
            timeCaption="Time"
            timeInputLabel="Time:"
            dateFormat='yyyy년 MM월 dd일 HH:mm'
            shouldCloseOnSelect
            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <div className={styles.customHeaderContainer}>
                <div>
                  <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
                  <select value={getYear(date)} className={styles.year} onChange={({ target: { value } }) => changeYear(+value)}>
                    {YEARS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type='button' onClick={decreaseMonth} className={styles.monthButton} disabled={prevMonthButtonDisabled}>
                    <FiArrowLeft />
                  </button>
                  <button type='button' onClick={increaseMonth} className={styles.monthButton} disabled={nextMonthButtonDisabled}>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            )}
          />
        </CalenderWrapper>

        <CalenderWrapper>
          <CalenderText>설문 마감일</CalenderText>
          <DatePicker
            className={styles.datePicker}
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            showTimeSelect
            timeIntervals={15}
            timeFormat="HH:mm"
            timeCaption="Time"
            timeInputLabel="Time:"
            dateFormat='yyyy년 MM월 dd일 HH:mm'
            shouldCloseOnSelect
            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <div className={styles.customHeaderContainer}>
                <div>
                  <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
                  <select value={getYear(date)} className={styles.year} onChange={({ target: { value } }) => changeYear(+value)}>
                    {YEARS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button type='button' onClick={decreaseMonth} className={styles.monthButton} disabled={prevMonthButtonDisabled}>
                    <FiArrowLeft />
                  </button>
                  <button type='button' onClick={increaseMonth} className={styles.monthButton} disabled={nextMonthButtonDisabled}>
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            )}
          />
        </CalenderWrapper>

        <Items>
          <CalenderText>통계 보기 허용</CalenderText>
          <Toggle>
            <input type='checkbox' checked={settingOptions.stat}
              onChange={handleStatToggle} />
            <span></span>
          </Toggle>
        </Items>
        <Items>
          <CalenderText>GPS</CalenderText>
          <GPSWrapper>
            {settingOptions.gps && (
              <GPS>
                <form onSubmit={handleGPSSubmit} style={{ paddingRight: '10px' }}>
                  <InputText
                    type='text'
                    value={address}
                    onClick={() => searchButtonRef.current.click()}
                    onChange={({ target: { value } }) => setAddress(value)}
                    readOnly
                  />
                  <button type='submit' ref={searchButtonRef} style={{ display: 'none' }} />
                </form>

                {address && (
                  <RangeSelectWrapper>
                    <RangeSelect value={selectedNumber} onChange={handleChange}>
                      {numbers.map((number, index) => (
                        <Option key={index} value={index + 1}>
                          {number}
                        </Option>
                      ))}
                    </RangeSelect>
                  </RangeSelectWrapper>
                )}
              </GPS>
            )}
            <Toggle>
              <input type='checkbox' checked={settingOptions.gps} onChange={handleGPSToggle} />
              <span></span>
            </Toggle>
          </GPSWrapper>
        </Items>
        <Items>
          <CalenderText>이메일</CalenderText>
          <Toggle>
            <input type='checkbox' checked={settingOptions.email}
              onChange={handleEmailToggle} />
            <span></span>
          </Toggle>
        </Items>
        <Items>
          <CalenderText>로그인 여부</CalenderText>
          <Toggle>
            <input type='checkbox' checked={settingOptions.login}
              onChange={handleLoginToggle} />
            <span></span>
          </Toggle>
        </Items>
        <Items>
          <CalenderText>인원 수 제한</CalenderText>
          <GPSWrapper>
            {settingOptions.participate && (
              <div style={{ paddingRight: '10px' }}>
                <input type='number' id='limit' value={limit} onChange={handleLimitChange} onBlur={handleParticipateNumChange} style={{ width: '100px' }} />
              </div>
            )}
            <Toggle>
              <input type='checkbox' id='toggle' checked={settingOptions.participate} onChange={handleParticipateToggle} />
              <span></span>
            </Toggle>
          </GPSWrapper>
        </Items>
      </Wrapper></>
  );
}


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.2rem;
  /* margin-top: 5rem; */
  /* margin-bottom: 5rem; */
  padding: 3rem;
  background-color: #EAEEEF;
  width: 700px; /* 원하는 너비로 설정하세요 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const CalenderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

const CalenderText = styled.p`
  display: flex;
  align-self: center;
  justify-self: center;
  text-align: center;
  font-size: 1rem;
  white-space: nowrap;
  margin: 1rem;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;
const GPS = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // padding-top: 1rem;
`;
const GPSWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 수정된 부분 */
  align-items: center;
  justify-content: flex-end;
`;

const RangeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  justify-content: space-between;
`;

const RangeSelect = styled.select`
  width: 100%;
  height: 2rem;
  border-radius: 7px;
  padding: 0.5rem;
  border: none;
  background-color: white;
  background-image: none;
  box-shadow: none;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    border-color: rgba(0, 123, 255, 0.5);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Option = styled.option`
  background-color: #fff;
  color: #6c757d;

  &:hover {
    background-color: #e9ecef;
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: #2196f3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;


const InputText = styled.input`
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
