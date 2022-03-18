import styled from "styled-components";

const Button = styled.button`
  background-color: #0095f6;
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: inherit;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: rgba(var(255, 255, 255, 255, 255, 255), 1);
  position: relative;

  &:disabled {
    opacity: 50%;
  }
`;

export const Otp = ({ setOtp, verifyOtp }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter otp"
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button onClick={verifyOtp}>Submit Otp</Button>
    </div>
  );
};
