import React from 'react'
import { Wrapper,TitleImg } from './style';

const SurveyImg = (formImg) => {
  return (
    <Wrapper>
       <TitleImg src={formImg.formImg} />
    </Wrapper>
  )
}
export default SurveyImg;
