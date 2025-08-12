import type React from "react";

export default function FormError({children}: {children:React.ReactNode}) {
  return (
    <p className="text-center text-white bg-red-500 my-4 p-4 font-bold ">{children}</p>
  )
}
