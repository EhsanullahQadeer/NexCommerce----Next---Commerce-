import { getFieldErrorNames } from "@/utility/getFieldErrorNames"
import { useFormikContext } from "formik"
import useDebounce from "./useDebounce"
import useSkipFirstRender from "./useSkipFirstRender"

export const useScrollToFieldError = () => {
    const { submitCount, isValid, errors } = useFormikContext()
    const debouceValue = useDebounce(submitCount, 0)
    useSkipFirstRender(() => {
        if (submitCount > 0 && isValid) return

        const fieldErrorNames = getFieldErrorNames(errors)
        if (fieldErrorNames.length <= 0) return

        const element = document.querySelector(
            `input[name='${fieldErrorNames[0]}']`
        )
        if (!element) return

        // Scroll to first known error into view
        element.scrollIntoView({ behavior: "smooth", block: "center" })
    }, [debouceValue]) // eslint-disable-line react-hooks/exhaustive-deps

    return null
}