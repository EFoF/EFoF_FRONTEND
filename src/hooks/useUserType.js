import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../api/auth";
import {userActions} from "../slices/user";
import useInput from "./useInput";
import {useNavigate} from "react-router-dom";
export default function useUserType() {
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const { me, signUpError, signUpDone } = useSelector(
    (state) => state.user,
  );

  const navigate = useNavigate();

  const [nickName,onChangeNickname] = useInput("");
  const [userName, onChangeName] = useInput("");
  const [bchecked, setBcheked] = useState(false);

  // const [types, setTypes] = useState([
  //   {
  //     id: 0,
  //     title: "🎨 아티스트",
  //     subTitle: `캐스팅/오디션 정보를 확인하고\n
  //           여러가지 영감을 받아가고 싶다면, 아티스트로 시작하세요!`,
  //     selected: true,
  //     loginMemberType: "GENERAL_USER",
  //   },
  //   {
  //     id: 1,
  //     title: "🧑‍💻 회사",
  //     subTitle: `캐스팅/오디션 정보를 등록하고, 당신의 뮤즈를 찾아보세요!`,
  //     selected: false,
  //     loginMemberType: "COMPANY_USER",
  //   },
  // ]);

//   useEffect(() => {
//     if (types[0].selected && !types[1].selected)
//       dispatch(signUp({ loginMemberType: types[0].loginMemberType }));
//     else if (!types[0].selected && types[1].selected)
//       dispatch(signUp({ loginMemberType: types[1].loginMemberType }));
//   }, [types]);

  useEffect(() => {
    dispatch(
      userActions.signUp({
        userName: userName,
      }),
    );
  }, [userName]);

  useEffect(() => {
    dispatch(
        userActions.signUp({
          nickName: nickName,
        }),
    );
  }, [nickName]);

  const checkHandler = useCallback(() => {
    setBcheked(!bchecked);
  }, [bchecked]);

//   const onToggleCheck = useCallback(
//     (id: number) => {
//       setTypes(
//         types.map(type =>
//           // eslint-disable-next-line no-nested-ternary
//           type.id === id
//             ? { ...type, selected: !type.selected }
//             : type.id !== id && type.selected === true
//             ? { ...type, selected: !type.selected }
//             : type,
//         ),
//       );
//     },
//     [types],
//   );

  const onReplaceBack = () => {
    navigate(-1);
  };

  const onSubmitForm = async () => {
    await dispatch(authSignUp(me));
  };

  const isValidName = (username) => {
    if (username.length < 2 || username.length>8)
      return false;
    else
      return true;
  }

  return {
    name: userName,
    onChangeName,
//     types,
//     onToggleCheck,
    onReplaceBack,
    onSubmitForm,
    signUpError,
    signUpDone,
    bchecked,
    checkHandler,
    onChangeNickname,
    isValidName,
  };
}
