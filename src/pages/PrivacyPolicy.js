import React from 'react';
import FooterOne from '../ui/common/Footer';
import HeaderOne from '../ui/common/Header';
import BreadCrumbOne from '../elements/breadcrumb/BreadCrumbOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import SEO from '../ui/common/SEO';
import PrivacyPolicyDetail from './signup/Email/Step2/PrivacyPolicyDetail';


const PrivacyPolicy = () => {

    return (
        <>
            <SEO title="Privacy Policy" />
            {/*<ColorSwitcher />*/}
            <main className="main-wrapper">
                <HeaderOne />
                <BreadCrumbOne 
                title="이용약관"
                />
                <div className="section-padding privacy-policy-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                {/* 개인정보 처리 방침 */}
                                <PrivacyPolicyDetail />
                                <br/><br/><br/>
                                {/* 위치정보 처리 방침 */}
                                <div className="privacy-policy-content">
                                    <div className="section-title">
                                        <h5 className="title">위치정보 처리 방침</h5>
                                    </div>
                                    
                                    <h4>제1조 (목적)</h4>
                                    <p>본 약관은 회원(본 약관에 동의한 자를 말합니다. 이하 “회원”이라고 합니다)이 주식회사 카카오모빌리티(이하 “회사”라고 합니다)가 제공하는 위치정보서비스 및 위치기반서비스(이하 “서비스”라고 합니다)를 이용함에 있어 회사와 회원의 권리•의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                                    
                                    <br/>
                                    
                                    <h4>제2조 (약관의 효력 및 변경)</h4>
                                    <p>①    본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본 약관에 동의하고 회사가 정한 소정의 절차에 따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.</p>
                                    <p>②    회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시하거나 기타의 방법으로 공지합니다.</p>
                                    <p>③    회사는 필요하다고 인정되면 본 약관을 변경할 수 있으며, 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 그 적용일자 7일 전부터 적용일 이후 상당한 기간 동안 공지합니다. 다만, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 30일 전부터 적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 게시하거나 회원에게 전자적 형태(전자우편, SMS 등)로 약관 개정 사실을 발송하여 고지합니다.</p>
                                    <p>④    회사가 전항에 따라 회원에게 공지하거나 통지하면서 공지 또는 통지ㆍ고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 불구하고 거부의 의사표시가 없는 경우에는 변경된 약관에 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 이용계약을 해지할 수 있습니다.</p>
                                    
                                    <br/>

                                    <h4>제3조 (약관 외 준칙)</h4>
                                    <p>본 약관에 규정되지 않은 사항에 대해서는 위치정보의 보호 및 이용 등에 관한 법률(이하 “위치정보법”이라고 합니다), 전기통신사업법, 정보통신망 이용촉진 및 보호 등에 관한 법률(이하 “정보통신망법”이라고 합니다), 개인정보보호법 등 관련법령 또는 회사가 정한 서비스의 운영정책 및 규칙 등(이하 “세부지침”이라고 합니다)의 규정에 따르며, 개인정보 처리기준 및 보호조치 등에 관한 사항은 개인정보 처리방침을 통해 공개합니다.</p>
                                    
                                    <br/>

                                    <h4>제10조(위치정보의 수집 방법)</h4>
                                    <p>①    회사는 위치정보 및 위치기반서비스를 제공하기 위하여 회원의 개인위치정보를 수집하며, 회원은 본 약관에 동의함으로써 이에 동의한 것으로 간주됩니다. 서비스 탈퇴 등의 방법을 통하여 개인위치정보의 수집에 관한 동의를 철회할 수 있습니다.</p>
                                    <p>②    회사는 다음과 같은 방식으로 개인위치정보를 수집하여, 회원에게 제6조 제2항의 서비스를 제공합니다.</p>
                                    <p>③    제2항에 따른 위치정보의 수집방법이 변경되는 경우 회사는 미리 홈페이지 등에 공지하거나 회원에게 별도 통지합니다. 다만 통제할 수 없는 사유가 발생하여 사전 통지가 불가능한 경우 사후 통지합니다.</p>

                                    <br/>

                                    <h4>제11조 (개인위치정보의 이용 또는 제공)</h4>
                                    <p>①    회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는 미리 약관에 명시한 후 개인위치정보주체의 동의를 얻어야 합니다.</p>
                                    <p>②    회사는 제3자에게 개인위치정보를 제공하는 경우에는, 제공 받는자 및 제공목적을 사전에 개인위치정보주체에게 고지하고 동의를 받습니다. 다만, 다음의 경우는 예외로 하고 있습니다.</p>
                                    <p>③    회사는 개인위치정보를 회원이 지정하는 제3자에게 제공하는 경우에는 개인위치정보를 수집한 당해 통신 단말장치로 매회 회원에게 제공받는 자, 제공 일시 및 제공목적을 즉시 통보합니다. 단, 아래 각 호의 1에 해당하는 경우에는 회원이 미리 특정하여 지정한 통신 단말장치 또는 전자우편주소로 통보합니다.</p>
                                    
                                    <br/>

                                    <h4>제14조 (개인위치정보주체의 권리)</h4>
                                    <p>①    회원은 회사에 대하여 언제든지 개인위치정보를 이용한 위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다.</p>
                                    <p>②    회원은 회사에 대하여 언제든지 개인위치정보의 수집, 이용 또는 제공의 일시적인 중지를 요구할 수 있으며, 회사는 이를 거절할 수 없고 이를 위한 기술적 수단을 갖추고 있습니다.</p>
                                    <p>③    회원은 회사에 대하여 아래 각 호의 자료에 대한 열람 또는 고지를 요구할 수 있고, 당해 자료에 오류가 있는 경우에는 그 정정을 요구할 수 있습니다. 이 경우 회사는 정당한 사유 없이 회원의 요구를 거절할 수 없습니다.</p>
                                    <p>
                                        &nbsp;&nbsp;&nbsp;1.    본인에 대한 위치정보 수집, 이용, 제공사실 확인자료 <br/>    
                                        &nbsp;&nbsp;&nbsp;2.    본인의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률 또는 다른 법률 규정에 의하여 제3자에게 제공된 이유 및 내용
                                    </p>
                                    <p>④    회원은 회사에서 정한 소정의 절차를 통해 제1항 내지 제3항의 내용을 요구할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <FooterOne parentClass="" />
            </main>
        </>
    )
}

export default PrivacyPolicy;