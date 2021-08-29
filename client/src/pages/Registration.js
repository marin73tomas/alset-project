import React from 'react'


const Registration = () => {

    const handleRegistration = (event) => {
        event.preventDefault()
        


    }
    return (
   <SectionContainer>
              <form onSubmit={handleRegistration} >
                <p className='h5 text-center mb-4'>Sign up</p>
                <label
                  htmlFor='defaultFormRegisterNameEx'
                  className='grey-text'
                >
                  Your name
                </label>
                <input
                  type='text'
                  id='defaultFormRegisterNameEx'
                  className='form-control'
                />
                <br />
                <label
                  htmlFor='defaultFormRegisterEmailEx'
                  className='grey-text'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='defaultFormRegisterEmailEx'
                  className='form-control'
                />
                <br />
                <label
                  htmlFor='defaultFormRegisterConfirmEx'
                  className='grey-text'
                >
                  Confirm your email
                </label>
                <input
                  type='email'
                  id='defaultFormRegisterConfirmEx'
                  className='form-control'
                />
                <br />
                <label
                  htmlFor='defaultFormRegisterPasswordEx'
                  className='grey-text'
                >
                  Your password
                </label>
                <input
                  type='password'
                  id='defaultFormRegisterPasswordEx'
                  className='form-control'
                />
                <div className='text-center mt-4'>
                  <button className='btn btn-unique' type='submit'>
                    Register
                  </button>
                </div>
              </form>
            </SectionContainer>
    )
}