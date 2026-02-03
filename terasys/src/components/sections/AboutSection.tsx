import styles from './AboutSection.module.css';
import logo from '../../assets/logo/terasys_logo.png';

const AboutSection = () => {
  return (
    <section className={styles.section} id="about">
      <div className={styles.aboutContent}>
        <div className={styles.aboutLogoContainer}>
          <img src={logo} alt="TERASYS Logo" className={styles.aboutLogo} />
        </div>
        <div className={styles.aboutTextContainer}>
          <h2 className={styles.aboutMainHeading}>
            최고의 기술과 풍부한 경험으로<br />
            차세대 보안운영의 표준을 제시합니다.
          </h2>
          <div className={styles.aboutBodyText}>
            안녕하십니까, 보안 솔루션 전문 기업 테라시스입니다.<br /><br />
            오늘날의 보안 환경은 온프레미스에서 클라우드까지 그 경계가 무너지고 있으며, 관리해야 할 보안 데이터는 기하급수적으로 늘어나고 있습니다. 기존의 통합로그분석이나 보안관제 시스템은 파편화된 위협 대응과 성능의 한계로 인해 갈수록 고도화되는 사이버 공격을 방어하는 데 어려움을 겪고 있습니다.<br /><br />
            테라시스는 이러한 한계를 극복하고자 보안운영 플랫폼 전문 기업인 로그프레소(Logpresso) 의 강력한 기술력에 금융, 제조, 통신, 공공 등 다양한 산업군에서 쌓아온 당사의 차세대 보안운영 (에이전틱 AI SIEM) 구축 노하우를 결합하였습니다.<br /><br />
            단순한 솔루션 공급을 넘어, 데이터 수집부터 위협 탐지, 침해 분석 및 대응(SOAR), 그리고 시각화에 이르기까지 모든 과정을 하나의 플랫폼으로 통합하여 완전한 가시성을 제공합니다. 테라시스는 AI와 위협 인텔리전스가 결합된 디지털 포렌식 수준의 자동 분석 체계를 구축하여, 고객사가 가장 안전한 디지털 환경에서 비즈니스에 전념할 수 있도록 최상의 동반자가 되겠습니다.
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;