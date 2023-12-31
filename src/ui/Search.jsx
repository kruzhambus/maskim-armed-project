import React, { Fragment, memo } from 'react'
import cx from 'clsx'
import PropTypes from 'prop-types'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import _map from 'lodash/map'


const Select = ({
	title, label, className, items, labelExtractor, keyExtractor, iconExtractor, onSelect, id,
	buttonClassName, capitalise, labelClassName, disabled
}) => (
	<Listbox disabled={disabled} id={id || ''} value={title} onChange={onSelect} clas>
		{({ open }) => (
			<>
				<Listbox.Label className='block text-sm whitespace-pre-line font-medium text-gray-70 text-emerald-500 disabled:brightness-150'>{label}</Listbox.Label>
				<div className={cx('mt-1 relative', className)}>
					<Listbox.Button
						className={cx('relative w-full bg-white border text-emerald-600 border-emerald-500 font-semibold rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:brightness-150', buttonClassName)}
					>
						<span
							className={cx('block truncate', {
								'first-letter:capitalize': capitalise,
							})}
						>
							{title}
						</span>
						<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
							<ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
						</span>
					</Listbox.Button>

					<Transition
						show={open}
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options
							static
							className='absolute z-10 mt-1 w-full bg-emerald-500 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
						>
							{_map(items, (item, index) => (
								<Listbox.Option
									key={keyExtractor ? keyExtractor(item, index) : item}
									className={({ active }) => cx('dark:text-white cursor-default select-none relative py-2 pl-8 pr-4', {
										'text-white bg-emerald-600': active,
										'text-gray-900': !active,
									})}
									value={labelExtractor ? labelExtractor(item, index) : item}
								>
									{({ selected, active }) => (
										<>
											<span
												className={cx('block truncate', {
													'font-semibold': selected,
													'font-normal': !selected,
													'first-letter:capitalize': capitalise,
												}, labelClassName)}
											>
												{typeof item === 'object' ? <span>{item.model}, {item.year}, {item.category}</span> : <span>{item}</span>}
											</span>

											{iconExtractor && (
												<span
													className={cx('absolute inset-y-0 left-0 flex items-center pl-1.5')}
												>
													{iconExtractor(item, index)}
												</span>
											)}

											{selected && (
												<span
													className={cx('absolute inset-y-0 left-0 flex items-center pl-1.5', {
														'text-white': active,
														'text-emerald-700': !active,
													})}
												>
													<CheckIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											)}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</>
		)}
	</Listbox>
)

Select.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string, PropTypes.object,
	])),
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	buttonClassName: PropTypes.string,
	capitalise: PropTypes.bool,
	labelExtractor: PropTypes.func,
	iconExtractor: PropTypes.func,
	keyExtractor: PropTypes.func,
	label: PropTypes.string,
	disabled: PropTypes.bool,
}

Select.defaultProps = {
	className: '',
	labelClassName: '',
	buttonClassName: '',
	capitalise: false,
	labelExtractor: null,
	keyExtractor: null,
	iconExtractor: null,
	label: '',
	items: [],
	id: '',
	disabled: false,
}

export default memo(Select)
