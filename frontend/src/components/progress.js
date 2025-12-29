import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import First from './first';
import Second from './second';
import Third from './third';
import Map from './map';
import { Link } from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Map2 from './map2';


const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
  padding-bottom: 100px;
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  margin-bottom: 70px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  &:after {
    content: '';
    position: absolute;
    background: #4a154b;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${({ step }) =>
    step === 'completed' ? '#4A154B' : '#F3E7F3'};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepCount = styled.span`
  font-size: 19px;
  color: #f3e7f3;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StepLabel = styled.span`
  font-size: 19px;
  color: #4a154b;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 100px;
`

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #4a154b;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #f3e7f3;
    color: #000000;
    cursor: not-allowed;
  }
`

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #4a154b;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`

const steps = [
  {
    label: 'Address',
    step: 1,
  },
  {
    label: 'Shipping',
    step: 2,
  },
  {
    label: 'Payment',
    step: 3,
  },
  {
    label: 'Summary',
    step: 4,
  },
]

const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(1)

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const totalSteps = steps.length
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`

  const [user, setUser] = useState(false)
  // const history = useHistory();
  const name = useSelector((state) => state.reducer.name);
  const email = useSelector((state) => state.reducer.email);
  const address = useSelector((state) => state.reducer.address);
  const number = useSelector((state) => state.reducer.number);
  const latitude1 = useSelector((state) => state.reducer.latitude1);
  const longitude1 = useSelector((state) => state.reducer.longitude1);
  const latitude2 = useSelector((state) => state.reducer.latitude2);
  const longitude2 = useSelector((state) => state.reducer.longitude2);
  const duration1 = useSelector((state) => state.reducer.duration);
  const distance1 = useSelector((state) => state.reducer.distance);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Reset the navigation stack and navigate to the login screen
      <Link to="/login" replace />
    } else {
      setUser(true);
    }
  }, []);
  return (<>
    {user && <MainContainer style={{fontFamily:"montserrat"}}>
      <StepContainer width={width}>
        {steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
              {activeStep > step ? (
                <CheckMark>L</CheckMark>
              ) : (
                <StepCount>{step}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel key={step}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
      {activeStep === 1 && <><First /></>}
      {activeStep === 2 && <Map2 />}
      {activeStep === 3 && <Third />}
      {activeStep === 4 && <div>Summary</div>}
      <ButtonsContainer>
        <ButtonStyle onClick={prevStep} disabled={((activeStep === 1))}>
          Previous
        </ButtonStyle>
        <ButtonStyle onClick={nextStep} disabled={(activeStep === totalSteps) || ((activeStep === 1) && ((name == "") || (address == "") || (email == "") || (number==""))) || ((activeStep===2)&&((latitude1=="")||(latitude2=="")||(longitude1=="")||(longitude2=="")||(duration1=="")||(distance1==""))) || (activeStep===3) }>
          Next
        </ButtonStyle>
      </ButtonsContainer>
    </MainContainer>}
    {/* {console.log(activeStep)} */}
    {!user && <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h2
        class="text-center text-4xl font-bold tracking-tight text-black mt-5 sm:text-5xl"
      >
        ERROR $)$<br /><br />Please <Link to="/login" replace className="text-blue-900">Login</Link> to Continue
      </h2></div>}
  </>
  )
}

export default ProgressSteps