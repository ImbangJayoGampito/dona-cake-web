import Step1Configure from "./step1-configure"
import Step2Reference from "./step2-reference"
import Step3Date from "./step3-date"
import Step4Confirm from "./step4-confirm"
import Step5Success from "./step5-success"
import Stepper from "@/components/booking/stopper"
import { useState } from "react"
export function BookingLayout() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <main>
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pb-10">
            {step < 5 && <Stepper current={step} />}

            {step === 1 && (
              <Step1Configure order={order} setOrder={setOrder} onNext={next} />
            )}
            {step === 2 && (
              <Step2Reference order={order} onBack={back} onNext={next} />
            )}
            {step === 3 && (
              <Step3Date order={order} onBack={back} onNext={next} />
            )}
            {step === 4 && (
              <Step4Confirm order={order} onBack={back} onNext={next} />
            )}
            {step === 5 && <Step5Success onHome={() => setStep(1)} />}
          </div>
        </main>
      </main>
    </div>
  )
}
