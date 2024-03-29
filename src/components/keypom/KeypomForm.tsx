import React from 'react';
import PropTypes from 'prop-types';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  currentAccountId: string;
}

export default function KeypomForm({ onSubmit, currentAccountId }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, { currentAccountId }!</p>
        <p className="highlight">
          <label htmlFor="message">Message:</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button type="submit">
          Sign
        </button>
      </fieldset>
    </form>
  );
}

KeypomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};