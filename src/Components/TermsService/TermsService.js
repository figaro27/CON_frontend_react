import React from "react";
import {I18n} from 'react-redux-i18n';
import './TermsService.css';

class TermsService extends React.Component {

	render() {
		return (
			<div className="main-content-section-inner">
				<div className="terms-of-service-wrapper">
					<div className="main-row row">
						<div className="main-col">
							<div className="common-title4">{I18n.t('terms_service')}</div>
						</div>
					</div>
					<div className="main-row row">
						<div className="main-col">
							<div className="terms-of-service-content-box">
								<div className="terms-of-service-text common-text1">
									<p>
										<b>{I18n.t('termsservice.text1')}</b><br/>
										<b>{I18n.t('termsservice.text2')}</b><br/>
										{I18n.t('termsservice.text3')}
										</p>
										<p>{I18n.t('termsservice.text4')}</p>
										<p>
											{I18n.t('termsservice.text5')}<br/>
											(I) {I18n.t('termsservice.text6')},<br/>
											<b>(II)</b> {I18n.t('termsservice.text7')},<br/>
											<b>(III)</b> {I18n.t('termsservice.text8')}<br/>
											<b>(IV)</b> {I18n.t('termsservice.text9')}
										</p>
										<p>
											1.1 {I18n.t('termsservice.text10')}<br/>
											(a) {I18n.t('termsservice.text11')}<br/>
											(b) {I18n.t('termsservice.text12')}<br/>
											(c) {I18n.t('termsservice.text13')}<br/>
											(d) {I18n.t('termsservice.text14')}<br/>
											(e) {I18n.t('termsservice.text15')}<br/>
											(f) {I18n.t('termsservice.text16')}<br/>
											(g) {I18n.t('termsservice.text17')}<br/>
											(h) {I18n.t('termsservice.text18')}<br/>
											(i) {I18n.t('termsservice.text19')}<br/>
											(j) {I18n.t('termsservice.text20')}<br/>
											(k) {I18n.t('termsservice.text21')}<br/>
											(l) {I18n.t('termsservice.text22')}<br/>
											(m) {I18n.t('termsservice.text23')}<br/>
											(n) {I18n.t('termsservice.text24')}<br/>
											<b>2. {I18n.t('termsservice.text25')}</b><br/>
											2.1 {I18n.t('termsservice.text26')}<br/>
											(a) {I18n.t('termsservice.text27')}<br/>
											{I18n.t('termsservice.text28')}<br/>
											(b) {I18n.t('termsservice.text29')}<br/>
											2.2 {I18n.t('termsservice.text30')}<br/>
											(a) {I18n.t('termsservice.text31')}<br/>
											(b) {I18n.t('termsservice.text32')}<br/>
											(c) {I18n.t('termsservice.text33')}<br/>
											2.3 DAA<br/>
											(a) {I18n.t('termsservice.text34')}<br/>
											(b) {I18n.t('termsservice.text35')}<br/>
											(c) {I18n.t('termsservice.text36')}<br/>
											(d) {I18n.t('termsservice.text37')}<br/>
											(e) {I18n.t('termsservice.text38')}<br/>
											2.4 {I18n.t('termsservice.text39')}<br/>
											{I18n.t('termsservice.text40')}<br/>
											2.5 {I18n.t('termsservice.text41')}<br/>
											2.6 {I18n.t('termsservice.text42')}<br/>
											2.7 {I18n.t('termsservice.text43')}<br/>
											<b>3. {I18n.t('termsservice.text44')}</b><br/>
											3.1 {I18n.t('termsservice.text45')}<br/>
											(a) {I18n.t('termsservice.text46')}<br/>
											(b) {I18n.t('termsservice.text47')}<br/>
											3.2 {I18n.t('termsservice.text48')}<br/>
											3.3 {I18n.t('termsservice.text49')}<br/>
											3.4 {I18n.t('termsservice.text50')}<br/>
											3.5 {I18n.t('termsservice.text51')}<br/>
											3.6 {I18n.t('termsservice.text52')}<br/>
											3.7 {I18n.t('termsservice.text53')}<br/>
											3.8 {I18n.t('termsservice.text54')}<br/>
											3.9 {I18n.t('termsservice.text55')}<br/>
											3.10 {I18n.t('termsservice.text56')}<br/>
											3.11 {I18n.t('termsservice.text57')}<br/>
											(a) {I18n.t('termsservice.text58')}<br/>
											(b) {I18n.t('termsservice.text59')}<br/>
											3.12 {I18n.t('termsservice.text60')}<br/>
											(a) {I18n.t('termsservice.text61')}<br/>
											(b) {I18n.t('termsservice.text62')}<br/>
											<b>4. {I18n.t('termsservice.text63')}</b><br/>
											4.1 {I18n.t('termsservice.text64')}<br/>
											4.2 {I18n.t('termsservice.text65')}<br/>
											4.3 {I18n.t('termsservice.text66')}<br/>
											4.4 {I18n.t('termsservice.text67')}<br/>
											4.5 {I18n.t('termsservice.text68')}<br/>
											4.6 {I18n.t('termsservice.text69')}<br/>
											<b>5. {I18n.t('termsservice.text70')}</b><br/>
											5.1 {I18n.t('termsservice.text71')}<br/>
											5.2 {I18n.t('termsservice.text72')}<br/>
											5.3 {I18n.t('termsservice.text73')}<br/>
											5.4 {I18n.t('termsservice.text74')}<br/>
											<b>6. {I18n.t('termsservice.text75')}</b><br/>
											6.1 {I18n.t('termsservice.text76')}<br/>
											6.2 {I18n.t('termsservice.text77')}<br/>
											(a) {I18n.t('termsservice.text78')}<br/>
											{I18n.t('termsservice.text79')}<br/>
											{I18n.t('termsservice.text80')}<br/>
											{I18n.t('termsservice.text81')}<br/>
											{I18n.t('termsservice.text82')}<br/>
											(b) {I18n.t('termsservice.text83')}<br/>
											{I18n.t('termsservice.text84')}<br/>
											{I18n.t('termsservice.text85')}<br/>
											{I18n.t('termsservice.text86')}<br/>
											(c) {I18n.t('termsservice.text87')}<br/>
											{I18n.t('termsservice.text88')}<br/>
											{I18n.t('termsservice.text89')}<br/>
											(d) {I18n.t('termsservice.text90')}<br/>
											{I18n.t('termsservice.text91')}<br/>
											(e) {I18n.t('termsservice.text92')}<br/>
											{I18n.t('termsservice.text93')}<br/>
											(g) {I18n.t('termsservice.text94')}<br/>
											{I18n.t('termsservice.text95')}<br/>
											(h) {I18n.t('termsservice.text96')}<br/>
											{I18n.t('termsservice.text97')}<br/>
											(i) {I18n.t('termsservice.text98')}<br/>
											{I18n.t('termsservice.text99')}<br/>
											{I18n.t('termsservice.text100')}<br/>
											(j) {I18n.t('termsservice.text101')}<br/>
											{I18n.t('termsservice.text102')}<br/>
											(k) {I18n.t('termsservice.text103')}<br/>
											{I18n.t('termsservice.text104')}<br/>
											(l) {I18n.t('termsservice.text105')}<br/>
											{I18n.t('termsservice.text106')}<br/>
											(m) {I18n.t('termsservice.text107')}<br/>
											{I18n.t('termsservice.text108')}<br/>
											(n) {I18n.t('termsservice.text109')}<br/>
											{I18n.t('termsservice.text110')}<br/>
											6.3 {I18n.t('termsservice.text111')}<br/>
											<b>7. FEES</b><br/>
											7.1 {I18n.t('termsservice.text112')}<br/>
											(a) {I18n.t('termsservice.text113')}<br/>
											(b) {I18n.t('termsservice.text114')}<br/>
											(c) {I18n.t('termsservice.text115')}<br/>
											7.2 {I18n.t('termsservice.text116')}<br/>
											7.3 {I18n.t('termsservice.text117')}<br/>
											7.4 {I18n.t('termsservice.text118')}<br/>
											<b>8. {I18n.t('termsservice.text119')}</b><br/>
											8.1 {I18n.t('termsservice.text120')}<br/>
											8.2 {I18n.t('termsservice.text121')}<br/>
											8.3 {I18n.t('termsservice.text122')}<br/>
											8.4 {I18n.t('termsservice.text123')}<br/>
											(a) {I18n.t('termsservice.text124')}<br/>
											(b) {I18n.t('termsservice.text125')}<br/>
											8.5 {I18n.t('termsservice.text126')}<br/>
											(a) {I18n.t('termsservice.text127')}<br/>
											(b) {I18n.t('termsservice.text128')}<br/>
											(c) {I18n.t('termsservice.text129')}<br/>
											(d) {I18n.t('termsservice.text130')}<br/>
											(e) {I18n.t('termsservice.text131')}<br/>
											(f) {I18n.t('termsservice.text132')}<br/>
											<b>9. {I18n.t('termsservice.text133')}</b><br/>
											9.1 {I18n.t('termsservice.text134')}<br/>
											9.2 {I18n.t('termsservice.text135')}<br/>
											9.3 {I18n.t('termsservice.text136')}<br/>
											9.4 {I18n.t('termsservice.text137')}<br/>
											<b>10. {I18n.t('termsservice.text138')}</b><br/>
											10.1 {I18n.t('termsservice.text139')}<br/>
											10.2 {I18n.t('termsservice.text140')}<br/>
											(a) {I18n.t('termsservice.text141')}<br/>
											(b) {I18n.t('termsservice.text142')}<br/>
											(c) {I18n.t('termsservice.text143')}<br/>
											(d) {I18n.t('termsservice.text144')}<br/>
											10.3 {I18n.t('termsservice.text145')}<br/>
											10.4 {I18n.t('termsservice.text146')}<br/>
											10.5 {I18n.t('termsservice.text147')}<br/>
											10.6 {I18n.t('termsservice.text148')}<br/>
											{I18n.t('termsservice.text149')}<br/>
											<b>11. {I18n.t('termsservice.text150')}</b><br/>
											11.1 {I18n.t('termsservice.text151')}<br/>
											(i) {I18n.t('termsservice.text152')}<br/>
											(ii) {I18n.t('termsservice.text153')}<br/>
											(iii) {I18n.t('termsservice.text154')}<br/>
											11.2 {I18n.t('termsservice.text155')}<br/>
											11.3 {I18n.t('termsservice.text156')}<br/>
											<b>12. {I18n.t('termsservice.text157')}</b><br/>
											12.1 {I18n.t('termsservice.text158')}<br/>
											12.2 {I18n.t('termsservice.text159')}<br/>
											12.3 {I18n.t('termsservice.text160')}<br/>
											12.4 {I18n.t('termsservice.text161')}<br/>
											12.5 {I18n.t('termsservice.text162')}<br/>
											(i) {I18n.t('termsservice.text163')}<br/>
											(ii) {I18n.t('termsservice.text164')}<br/>
											(iii) {I18n.t('termsservice.text165')}<br/>
											(vi) {I18n.t('termsservice.text166')}<br/>
											(vii) {I18n.t('termsservice.text167')}<br/>
											12.6 {I18n.t('termsservice.text168')}<br/>
											12.7 {I18n.t('termsservice.text169')}<br/>
											12.8 {I18n.t('termsservice.text170')}<br/>
											12.9 {I18n.t('termsservice.text171')}<br/>
											12.10 {I18n.t('termsservice.text172')}<br/>
											12.11 {I18n.t('termsservice.text173')}<br/>
											12.12 {I18n.t('termsservice.text174')}<br/>
											(a) {I18n.t('termsservice.text175')}<br/>
											(b) {I18n.t('termsservice.text176')}<br/>
											(c) {I18n.t('termsservice.text177')}<br/>
											(d) {I18n.t('termsservice.text178')}<br/>
											(e) {I18n.t('termsservice.text179')}<br/>
											(f) {I18n.t('termsservice.text180')}<br/>
											12.13 {I18n.t('termsservice.text181')}<br/>
											12.14 {I18n.t('termsservice.text182')}<br/>
											{I18n.t('termsservice.text183')}<br/>
											<b>13. {I18n.t('termsservice.text184')}</b><br/>
											13.1 {I18n.t('termsservice.text185')}<br/>
											13.2 {I18n.t('termsservice.text186')}<br/>
											<b>14. {I18n.t('termsservice.text187')}</b><br/>
											14.1 {I18n.t('termsservice.text188')}<br/>
											14.2 {I18n.t('termsservice.text189')}<br/>
											14.3 {I18n.t('termsservice.text190')}<br/>
											14.4 {I18n.t('termsservice.text191')}<br/>
											14.5 {I18n.t('termsservice.text192')}<br/>
											{I18n.t('termsservice.text193')}<br/>
											<b>15. {I18n.t('termsservice.text194')}</b><br/>
											15.1 {I18n.t('termsservice.text195')}<br/>
											15.2 {I18n.t('termsservice.text196')}<br/>
											15.3 {I18n.t('termsservice.text197')}<br/>
											<b>16. {I18n.t('termsservice.text198')}</b><br/>
											16.1 {I18n.t('termsservice.text199')}<br/>
											(i) {I18n.t('termsservice.text200')}<br/>
											(ii) {I18n.t('termsservice.text201')}<br/>
											16.2 {I18n.t('termsservice.text202')}<br/>
											16.3 {I18n.t('termsservice.text203')}<br/>
											<b>17. {I18n.t('termsservice.text204')}</b><br/>
											17.1 {I18n.t('termsservice.text205')}<br/>
											17.2 {I18n.t('termsservice.text206')}<br/>
											17.3 {I18n.t('termsservice.text207')}<br/>
											(a) {I18n.t('termsservice.text208')}<br/>
											(b) {I18n.t('termsservice.text209')}<br/>
											17.4 {I18n.t('termsservice.text210')}<br/>
											17.5 {I18n.t('termsservice.text211')}<br/>
											17.6 {I18n.t('termsservice.text212')}<br/>
											17.7 {I18n.t('termsservice.text213')}<br/>
											17.8 {I18n.t('termsservice.text214')}<br/>
											17.9 {I18n.t('termsservice.text215')}<br/>
											17.10 {I18n.t('termsservice.text216')}<br/>
											17.11 {I18n.t('termsservice.text217')}<br/>
											18.1 {I18n.t('termsservice.text218')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TermsService;
