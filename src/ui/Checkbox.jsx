import React, { memo } from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'

const Checkbox = ({
	label, hint, id, name, className, onChange, checked, hintClassName,
}) => {
	const identifier = id || name

	return (
		<div className={cx('relative flex items-start whitespace-pre-line', className)}>
			<div className='flex items-center h-5'>
				<input
					id={identifier}
					aria-describedby={`${identifier}-description`}
					name={name}
					type='checkbox'
					checked={checked}
					onChange={onChange}
					className='focus:ring-emerald-500 h-4 w-4 text-emerald-600 border-gray-300 rounded cursor-pointer'
				/>
			</div>
			<div className='ml-3 text-sm'>
				<label htmlFor={identifier} className='font-medium text-gray-700 cursor-pointer'>{label}</label>
				{hint && (
					<p id={`${identifier}-description`} className={cx('text-gray-500 ', hintClassName)}>{hint}</p>
				)}
			</div>
		</div>
	)
}

Checkbox.propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string, PropTypes.node,
	]),
	checked: PropTypes.bool.isRequired,
	hint: PropTypes.string,
	onChange: PropTypes.func,
	id: PropTypes.string,
	className: PropTypes.string,
	name: PropTypes.string,
	hintClassName: PropTypes.string,
}

Checkbox.defaultProps = {
	label: '',
	hint: '',
	onChange: () => { },
	id: '',
	className: '',
	name: '',
	hintClassName: '',
}

export default memo(Checkbox)
