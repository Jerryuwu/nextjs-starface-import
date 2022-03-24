import * as Yup from 'yup'

function login() {
  //TODO: Create Login page: what data is needed for login?
  const loginValidation = Yup.object().shape({
    username: Yup.string().required('Benutzername fehlt'),
    password: Yup.string().required('Benutzername fehlt'),
  })
  //const formOptions = { resolver: yupResolver(loginValidation) }

  //const { register, handleSubmit, formState } = useForm(formOptions)
  //https://codesandbox.io/s/next-js-11-user-registration-and-login-example-zde4h?from-embed=&file=/services/user.service.js
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-1/2">
        <div className="h-16 bg-primary text-2xl">Login</div>
        <div className="h-32 bg-white">
          {/*<form onSubmit={handleSubmit(onsubmit)}></form>*/}
        </div>
      </div>
    </div>
  )
}
export default login
