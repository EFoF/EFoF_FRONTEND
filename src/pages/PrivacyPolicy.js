import React from 'react';
import FooterOne from '../ui/common/Footer';
import HeaderOne from '../ui/common/Header';
import BreadCrumbOne from '../elements/breadcrumb/BreadCrumbOne';
import ColorSwitcher from '../elements/switcher/ColorSwitcher';
import SEO from '../ui/common/SEO';


const PrivacyPolicy = () => {

    return (
        <>
            <SEO title="Privacy Policy" />
            <ColorSwitcher />
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
                                <div className="privacy-policy-content">
                                    <div className="section-title">
                                        <h5 className="title">개인정보 처리 방침</h5>
                                    </div>
                                    
                                    <h4>개인정보 보호법 제35조(개인정보의 열람)</h4>
                                    <p>①   정보주체는 개인정보처리자가 처리하는 자신의 개인정보에 대한 열람을 해당 개인정보처리자에게 요구할 수 있다.</p>
                                    <p>②   제1항에도 불구하고 정보주체가 자신의 개인정보에 대한 열람을 공공기관에 요구하고자 할 때에는 공공기관에 직접 열람을 요구하거나 대통령령으로 정하는 바에 따라 보호위원회장관을 통하여 열람을 요구할 수 있다. </p>
                                    <p>③   개인정보처리자는 제1항 및 제2항에 따른 열람을 요구받았을 때에는 대통령령으로 정하는 기간 내에 정보주체가 해당 개인정보를 열람할 수 있도록 하여야 한다. 이 경우 해당 기간 내에 열람할 수 없는 정당한 사유가 있을 때에는 정보주체에게 그 사유를 알리고 열람을 연기할 수 있으며, 그 사유가 소멸하면 지체 없이 열람하게 하여야 한다.</p>
                                    <p>④   개인정보처리자는 다음 각 호의 어느 하나에 해당하는 경우에는 정보주체에게 그 사유를 알리고 열람을 제한하거나 거절할 수 있다.</p>
                                    <p>&nbsp;&nbsp;&nbsp; 1.   법률에 따라 열람이 금지되거나 제한되는 경우<br/>
                                       &nbsp;&nbsp;&nbsp; 2.   다른 사람의 생명ㆍ신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우<br/>
                                       &nbsp;&nbsp;&nbsp; 3.   공공기관이 다음 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장을 초래하는 경우
                                    </p>
                                    <p>⑤   제1항부터 제4항까지의 규정에 따른 열람 요구, 열람 제한, 통지 등의 방법 및 절차에 관하여 필요한 사항은 대통령령으로 정한다.</p>
                                    
                                    <br/>
                                    
                                    <h4>개인정보 보호법 제36조(개인정보의 정정ㆍ삭제)</h4>
                                    <p>①   제35조에 따라 자신의 개인정보를 열람한 정보주체는 개인정보처리자에게 그 개인정보의 정정 또는 삭제를 요구할 수 있다. 다만, 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없다.</p>
                                    <p>②   개인정보처리자는 제1항에 따른 정보주체의 요구를 받았을 때에는 개인정보의 정정 또는 삭제에 관하여 다른 법령에 특별한 절차가 규정되어 있는 경우를 제외하고는 지체 없이 그 개인정보를 조사하여 정보주체의 요구에 따라 정정ㆍ삭제 등 필요한 조치를 한 후 그 결과를 정보주체에게 알려야 한다.</p>
                                    <p>③   개인정보처리자가 제2항에 따라 개인정보를 삭제할 때에는 복구 또는 재생되지 아니하도록 조치하여야 한다.</p>
                                    <p>④   개인정보처리자는 정보주체의 요구가 제1항 단서에 해당될 때에는 지체 없이 그 내용을 정보주체에게 알려야 한다.</p>
                                    <p>⑤   개인정보처리자는 제2항에 따른 조사를 할 때 필요하면 해당 정보주체에게 정정ㆍ삭제 요구사항의 확인에 필요한 증거자료를 제출하게 할 수 있다.</p>
                                    <p>⑥   제1항ㆍ제2항 및 제4항에 따른 정정 또는 삭제 요구, 통지 방법 및 절차 등에 필요한 사항은 대통령령으로 정한다.</p>

                                    <br/>
                                    
                                    <h4>개인정보 보호법 제37조(개인정보의 처리정지 등)</h4>
                                    <p>①   정보주체는 개인정보처리자에 대하여 자신의 개인정보 처리의 정지를 요구할 수 있다. 이 경우 공공기관에 대하여는 제32조에 따라 등록 대상이 되는 개인정보파일 중 자신의 개인정보에 대한 처리의 정지를 요구할 수 있다.</p>
                                    <p>②   개인정보처리자는 제1항에 따른 요구를 받았을 때에는 지체 없이 정보주체의 요구에 따라 개인정보 처리의 전부를 정지하거나 일부를 정지하여야 한다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는 정보주체의 처리정지 요구를 거절할 수 있다.</p>
                                    <p>
                                        &nbsp;&nbsp;&nbsp; 1.   법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우 <br/>
                                        &nbsp;&nbsp;&nbsp; 2.   다른 사람의 생명ㆍ신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우<br/>
                                        &nbsp;&nbsp;&nbsp; 3.   공공기관이 개인정보를 처리하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우
                                    </p>
                                    <p>③   개인정보처리자는 제2항 단서에 따라 처리정지 요구를 거절하였을 때에는 정보주체에게 지체 없이 그 사유를 알려야 한다.</p>
                                    <p>④   개인정보처리자는 정보주체의 요구에 따라 처리가 정지된 개인정보에 대하여 지체 없이 해당 개인정보의 파기 등 필요한 조치를 하여야 한다.</p>
                                    <p>⑤   제1항부터 제3항까지의 규정에 따른 처리정지의 요구, 처리정지의 거절, 통지 등의 방법 및 절차에 필요한 사항은 대통령령으로 정한다.</p>

                                    <br/>

                                    <h4>개인정보 보호법 제38조(권리행사의 방법 및 절차)</h4>
                                    <p>①   정보주체는 제35조에 따른 열람, 제36조에 따른 정정ㆍ삭제, 제37조에 따른 처리정지 등의 요구(이하 "열람등요구"라 한다)를 문서 등 대통령령으로 정하는 방법ㆍ절차에 따라 대리인에게 하게 할 수 있다.</p>
                                    <p>②   만 14세 미만 아동의 법정대리인은 개인정보처리자에게 그 아동의 개인정보 열람등요구를 할 수 있다.</p>
                                    <p>③   개인정보처리자는 열람등요구를 하는 자에게 대통령령으로 정하는 바에 따라 수수료와 우송료(사본의 우송을 청구하는 경우에 한한다)를 청구할 수 있다.</p>
                                    <p>④   개인정보처리자는 정보주체가 열람등요구를 할 수 있는 구체적인 방법과 절차를 마련하고, 이를 정보주체가 알 수 있도록 공개하여야 한다.</p>
                                    <p>⑤   개인정보처리자는 정보주체가 열람등요구에 대한 거절 등 조치에 대하여 불복이 있는 경우 이의를 제기할 수 있도록 필요한 절차를 마련하고 안내하여야 한다.</p>
                                    
                                </div>
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