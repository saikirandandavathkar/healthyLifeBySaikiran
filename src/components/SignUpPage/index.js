import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const getData = () => {
  const accountsData = JSON.parse(localStorage.getItem('healthyLifeAccounts'))
  if (accountsData === null) {
    return []
  }
  return accountsData
}

class SignUpPage extends Component {
  state = {
    accountList: getData(),
    name: '',
    email: '',
    mobileNumber: '',
    newPassword: '',
    confirmPassword: '',
    gender: 'Male',
    validMail: true,
    validPassword: true,
  }

  gotoLoginPage = () => {
    const {accountList} = this.state
    console.log(accountList)
    localStorage.setItem('healthyLifeAccounts', JSON.stringify(accountList))
    const {history} = this.props
    history.replace('/')
  }

  addName = event => {
    this.setState({name: event.target.value})
  }

  addEmail = event => {
    this.setState({email: event.target.value})
  }

  addNumber = event => {
    if (event.target.value.length <= 12) {
      const digits = '0123456789'
      const digitsList = event.target.value.split('')
      const valid = digitsList.every(
        eachItem => digits.includes(eachItem) === true,
      )

      if (valid === true) {
        this.setState({mobileNumber: event.target.value})
      }
    }
  }

  addNewPassword = event => {
    this.setState({newPassword: event.target.value})
  }

  addConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  addGender = event => {
    this.setState({gender: event.target.value})
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {
      name,
      email,
      mobileNumber,
      newPassword,
      confirmPassword,
      gender,
      accountList,
    } = this.state
    if (
      name.lenth !== 0 &&
      email.length !== 0 &&
      mobileNumber.length !== 0 &&
      newPassword.length !== 0 &&
      confirmPassword.length !== 0
    ) {
      const valid1 = accountList.every(eachItem => {
        if (eachItem.email !== email) {
          return true
        }
        return false
      })

      const valid2 = newPassword === confirmPassword

      if (valid1 === true) {
        if (valid2 === true) {
          const newObj = {
            name,
            email,
            mobileNumber,
            password: newPassword,
            gender,
          }

          const updatedList = [...accountList, newObj]

          this.setState(
            {accountList: updatedList, validMail: true, validPassword: true},
            this.gotoLoginPage,
          )
        } else {
          this.setState({validPassword: false, validMail: true})
        }
      } else {
        this.setState({validMail: false})
      }
    }
  }

  render() {
    const {
      name,
      email,
      mobileNumber,
      newPassword,
      confirmPassword,
      validMail,
      validPassword,
    } = this.state
    return (
      <div className="signUP-container" onSubmit={this.onSubmitDetails}>
        <form>
          <h1 className="signup-heading"> Create New Account </h1>
          <div className="field-container">
            <label htmlFor="nameId" className="username-heading">
              Name
            </label>
            <input
              type="text"
              id="nameId"
              className="user-field"
              onChange={this.addName}
              value={name}
            />
            <label htmlFor="emailId" className="username-heading">
              Email
            </label>
            <input
              type="text"
              id="emailId"
              className="user-field"
              onChange={this.addEmail}
              value={email}
            />
            {validMail ? (
              ''
            ) : (
              <p className="error-heading">*Email already exists</p>
            )}
            <label htmlFor="mobileNumberId" className="username-heading">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumberId"
              className="user-field"
              onChange={this.addNumber}
              value={mobileNumber}
            />
            <label htmlFor="passwordId" className="username-heading">
              New Password
            </label>
            <input
              type="password"
              id="passwordId"
              className="user-field"
              onChange={this.addNewPassword}
              value={newPassword}
            />
            <label htmlFor="confirmPasswordId" className="username-heading">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPasswordId"
              className="user-field"
              onChange={this.addConfirmPassword}
              value={confirmPassword}
            />
            {validPassword ? (
              ''
            ) : (
              <p className="error-heading">*Password not matched</p>
            )}
          </div>
          <p className="username-heading"> Gender</p>
          <div>
            <input
              type="radio"
              id="maleId"
              name="gender"
              onChange={this.addGender}
              value="Male"
              checked
            />
            <label htmlFor="maleId" className="username-heading">
              Male
            </label>
            <input
              type="radio"
              id="femaleId"
              name="gender"
              value="Female"
              onChange={this.addGender}
            />
            <label htmlFor="femaleId" className="username-heading">
              Female
            </label>
          </div>
          <button type="submit" className="createBtn">
            Create Account
          </button>
          <div className="signUp-container">
            <p className="new-user-heading"> Already have an account ? </p>
            <Link to="/">
              <p className="create-Heading"> Login </p>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUpPage
