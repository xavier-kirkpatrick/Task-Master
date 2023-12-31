import { HtmlHTMLAttributes } from 'react'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>

/* Button structure in the document:
 <Button>button-name</Button> 
*/

function Button({ onClick, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`bg-darkPurple text-primary font-bold py-2 px-6 rounded-full hover:bg-darkPurple hover:text-primary focus:shadow-[0px_0px_5px_2px_#C3ACD0] ${rest?.addclasses}`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
