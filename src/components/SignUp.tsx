import { useState } from "react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <h2>Sign In</h2>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email-address"
            type="text"
            value={email}
            name="email"
            autoComplete="email"
            required
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            value={password}
            name="password"
            autoComplete="current-password"
            required
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;