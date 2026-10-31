import PropTypes from 'prop-types';

function PrimaryButton({ children, onClickButton, disabled = false, type = 'button' }) {
    return (
        <button
            type={type}
            className="
                shadow-md
                text-c-white
                bg-c-navy
                hover:bg-c-navy-soft
                focus:outline-none 
                focus:ring-4 
                focus:ring-sky-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                transition
                duration-200
                hover:scale-[1.03]
                active:scale-95
                font-medium 
                rounded-full 
                text-sm 
                px-10 
                py-2.5 
                text-center"
            onClick={onClickButton}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

PrimaryButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClickButton: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default PrimaryButton;
