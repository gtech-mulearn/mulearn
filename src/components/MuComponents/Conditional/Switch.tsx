type Child=JSX.Element| null|string

interface ChildElement {
    children: any
}

interface CaseProps extends ChildElement {
    condition: boolean
}
/**
 * Generates a switch component that renders the first child whose condition is true, or the default child if no condition is true.
 *
 * @param {ChildElement} children - The children elements of the switch component.
 * @return {JSX.Element} - The matched child or the default child if no condition is true.
 */
const Switch = ({children}:ChildElement) => {
    if(Array.isArray(children)){
        let matchChild:Child = null,defaultChild:Child = null
        for(let child of children){
            const {condition:conditionalParameter} = (child as JSX.Element)?.props
            const condition=Boolean(conditionalParameter)
            if (condition && (child as JSX.Element)?.type?.name==='Case') return <>{child}</>
            if ((child as JSX.Element)?.type.name==='Default') defaultChild=child
        }
        return matchChild || <>{defaultChild}</> ||<></>
    }
    return <></>
}

/**
 * Renders the children if the condition is true.
 * 
 * @param condition - The condition to check.
 * @param children - The children to render.
 */
const Case = ({ condition, children }: CaseProps) => <>{children}</>;

/**
 * Renders the default component.
 *
 * @param {ChildElement} props - The props for the component.
 * @returns {React.ReactNode} The rendered component.
 */

const Default = ({children}:ChildElement)=><>{children}</>


export { Switch,Case,Default}