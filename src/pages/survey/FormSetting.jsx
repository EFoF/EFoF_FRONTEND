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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

`;

const CalenderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 30%;

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
  width: 30%;
  justify-content: space-between;

`;
const RangeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
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

const ToggleText = styled.span`
  margin-left: 10px;
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

const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);
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
  const currentPath = window.location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [isDaumPost, setIsDaumPost] = useState(false);
  const searchButtonRef = useRef(null);
  // add this line after `const { id } = useParams();`
  const [selectedNumber, setSelectedNumber] = useState(0);
  const numbers = Array.from(['1km','2km','3km','4km','5km']);
  const [showInput, setShowInput] = useState(false);
  const [limit, setLimit] = useState(0);
  
  const handleToggle = () => {
    setShowInput(!showInput);
  }
  
  const handleLimitChange = (event) => {
    const value = Number(event.target.value);
  
    if (value >= 0) {
      setLimit(value);
    } else {
      toastMsg('인원 수 제한에 음수를 입력할 수 없습니다.');
    }
  };
  
  const handleChange = (e) => {
    setSelectedNumber((e.target.value));
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGPSSubmit = (event) => {
    event.preventDefault();
    if (!isDaumPost) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setIsDaumPost(true);
          setZipcode(data.zonecode);
          setAddress(data.address);
        }
      }).open();
    } else {
      console.log(zipcode, address);
    }
  }

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // '/form/pre-release/:id' 경로인 경우에만 특정 로직 수행
  useEffect(() => {
    // ...
  }, [id, currentPath]);

  return (
    <Wrapper>
      <CalenderWrapper>
        <CalenderText>설문 시작일</CalenderText>
        <DatePicker
          className={styles.datePicker}
          selected={selectedStartDate}
          onChange={handleStartDateChange}
          dateFormat='yyyy년 MM월 dd일'
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
          dateFormat='yyyy년 MM월 dd일'
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
          <input type='checkbox' />
          <span></span>
        </Toggle>
      </Items>
      <Items>
        <CalenderText>GPS</CalenderText>
        <form onSubmit={handleGPSSubmit}>
          <InputText
            type='text'
            value={address}
            onClick={() => searchButtonRef.current.click()}
            onChange={({ target: { value } }) => setAddress(value)}
            readOnly
          />
          <button type='submit' ref={searchButtonRef} style={{ display: 'none' }} />


        </form>
          <CalenderText>범위 </CalenderText>
        <RangeSelectWrapper>
          <RangeSelect value={selectedNumber} onChange={handleChange}>
            {numbers.map((number, index) => (
              <Option key={index} value={number}>
                {number}
              </Option>
            ))}
          </RangeSelect>
        </RangeSelectWrapper>
      </Items>
      <Items>
        <CalenderText>이메일</CalenderText>
        <Toggle>
          <input type='checkbox' />
          <span></span>
        </Toggle>
      </Items>
      <Items>
        <CalenderText>로그인 여부</CalenderText>
        <Toggle>
          <input type='checkbox' />
          <span></span>
        </Toggle>
      </Items>
      <Items>
        <CalenderText>인원 수 제한</CalenderText>
      <Toggle>
      <input type="checkbox" id="toggle" onChange={handleToggle} /><span></span>
      </Toggle>
      {showInput && (
        <div>
          <input type="number" id="limit" value={limit} onChange={handleLimitChange} />
        </div>
      )}
    </Items>
    </Wrapper>
  );
}
