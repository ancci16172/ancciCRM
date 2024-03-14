import { TransparentBackground } from "../../../shared/components/TransparentBackground";



export function AbsoluteFormContainer({className, children }) {


    return (
        <>
            <TransparentBackground />

            <div className={"absolute top-12 right-0 left-0 mx-auto border border-solid border-[#666]  max-w-[min(90%,22rem)] bg-white rounded-md z-[60] " + className}>
                {children}
            </div>
        </>
    )
}
