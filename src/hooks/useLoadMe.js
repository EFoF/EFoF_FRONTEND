import { useNavigate } from "react-router";
import {authLogout, loadMe} from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

export default function useLoadMe() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const useMyInfo = useCallback(async () => {
        // 이 놈이 여기 있으면 안되고 MyInfo 페이지 안으로 가야한다.
        await dispatch(loadMe());
        navigate("/myInfo");
    }, []);

    return {
        useMyInfo,
    };
}