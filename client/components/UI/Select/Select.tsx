import { HtmlHTMLAttributes } from 'react'

type SelectProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-name</Button> 
*/

function Select({ onClick, children, ...rest }: SelectProps) {
  return (
    <select
      className={`bg-lightPurple text-darkNavy font-bold py-4 px-4 mb-2 rounded-full focus:shadow-[0px_0px_5px_2px_#C3ACD0] ${rest?.addclasses}`}
      {...rest}
    >
      {children}
    </select>
  )
}

export default Select
