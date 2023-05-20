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

class LoginPage extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    userList: getData(),
    validEmail: true,
    validPassword: true,
  }

  gotoHomePage = () => {
    const {history} = this.props
    history.replace('/home')
  }

  enterEmail = event => {
    this.setState({userEmail: event.target.value})
  }

  enterPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  onSubmitCredentials = event => {
    event.preventDefault()
    const {userEmail, userPassword, userList} = this.state
    const userDetails = userList.find(eachUser => eachUser.email === userEmail)
    if (userDetails !== undefined) {
      if (userDetails.password === userPassword) {
        this.setState(
          {validEmail: true, validPassword: true},
          this.gotoHomePage,
        )
      } else {
        this.setState({validEmail: true, validPassword: false})
      }
    } else {
      this.setState({validEmail: false, validPassword: true})
    }
  }

  render() {
    const {userEmail, userPassword, validEmail, validPassword} = this.state
    return (
      <div className="container">
        <div className="logo-container">
          <h1 className="healthy-life-heading"> Healthy Life</h1>
          <img
            src="https://res.cloudinary.com/dnxboobjh/image/upload/v1684565673/health_care2_juxqz6.png"
            className="logo-img"
            alt="Healthy life"
          />
        </div>
        <form className="login-container">
          <div className="field-container">
            <label htmlFor="userId" className="username-heading">
              Email
            </label>
            <input
              type="text"
              id="userId"
              value={userEmail}
              className="user-field"
              onChange={this.enterEmail}
            />
            {validEmail ? (
              ''
            ) : (
              <p className="error-heading">*Enter Valid Email</p>
            )}
            <label htmlFor="passwordId" className="username-heading">
              {' '}
              Password{' '}
            </label>
            <input
              type="password"
              id="passwordId"
              value={userPassword}
              className="user-field"
              onChange={this.enterPassword}
            />
            {validPassword ? (
              ''
            ) : (
              <p className="error-heading">*Enter Valid Password</p>
            )}
          </div>
          <button
            type="button"
            className="login-button"
            onClick={this.onSubmitCredentials}
          >
            Login
          </button>
          <div className="signUp-container">
            <p className="new-user-heading"> Don't have an account yet? </p>
            <Link to="/signUp">
              <p className="create-Heading"> create an account </p>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
