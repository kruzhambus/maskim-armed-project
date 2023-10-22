import React, { useState, useEffect } from 'react'
import _keys from 'lodash/keys'
import _isEmpty from 'lodash/isEmpty'
// import { auth } from '../../hoc/protected'
import { auth } from '../../firebaseConfig'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import {
	isValidName, isValidPassword
} from '../../utils/validator'
import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore' 


const NewBrigade = () => {
	const [form, setForm] = useState({
		title: '',
		imgUrl: '',
	})
	//const isSettings = if route exist 'new'
	const [validated, setValidated] = useState(false)
	const [errors, setErrors] = useState({})
	const [beenSubmitted, setBeenSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const validate = () => {
		const allErrors = {}

		if (!isValidName(form.title)) {
			allErrors.title = 'Неправильна назва'
		}

		if (!isValidPassword(form.imgUrl)) {
			allErrors.imageUrl = 'Будь ласка оберіть файл картинки'
		}

		const valid = _isEmpty(_keys(allErrors))

		setErrors(allErrors)
		setValidated(valid)
	}

	useEffect(() => {
		validate()
  }, [form]) // eslint-disable-line


	const setBrigade = async (data) => {
		// Add a new document with a generated id.
		const docRef = await addDoc(collection(db, 'brigades'), data)
		console.log('Document written with ID: ', docRef.id)
	}

	const onSubmit = data => {
		if (!isLoading) {
			setIsLoading(true)

			// console.log('data', auth.currentUser.email)

			const newForm = {
				...data,
				creator: auth.currentUser.email,
				created: new Date().toISOString(),
				cars: []
			}

			setBrigade(newForm)



      
			setIsLoading(false)
		}
	}

	const handleInput = ({ target }) => {
		console.log(target.name, target.value)

		if(target.type === 'file') {
			const file = target?.files?.[0]
			
			if (!file) return
      
			const reader = new FileReader()
			reader.readAsDataURL(file)
			
			reader.onload = () => {
				const result = reader.result

				setForm(oldForm => ({
					...oldForm,
					[target.name]: result,
				}))

			}
		}


		const value = target.type === 'checkbox' ? target.checked : target.value

		setForm(oldForm => ({
			...oldForm,
			[target.name]: value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()
		e.stopPropagation()
		setBeenSubmitted(true)

		if (validated) {
			onSubmit(form)
		}
	}

	return (
		<div className='min-h-page bg-gray-50  flex flex-col py-6 px-4 sm:px-6 lg:px-8'>
			<form className='max-w-7xl w-full mx-auto' onSubmit={handleSubmit}>
				<h2 className='mt-2 text-3xl font-bold text-gray-900 '>
						Створити нову бригаду
				</h2>
				<Input
					name='title'
					id='title'
					type='text'
					label='Назва'
					value={form.title}
					placeholder='43 окрема артилерійська бригада'
					className='mt-4'
					onChange={handleInput}
					error={beenSubmitted && errors.title}
				/>
				
				<input
					id='imgUrl'
					name='imgUrl'
					type='file'
					label='Картинка'
					// value={form.imgUrl}
					className='mt-4'
					onChange={handleInput}
					// error={beenSubmitted && errors.imgUrl}
				/>

				{/* <div className='mt-10 w-full lg:min-h-[300px] min-h-[150px] relative flex justify-center items-center'>
					<label className='absolute top-0 left-0 flex justify-center items-center text-center w-full h-full p-20 border-2 border-gray-400 border-dashed' htmlFor='image'>
						{!form.imgUrl ? (
							'Оберіть картинку'
						) : (
							<img className='object-cover' width={350} height={250} src={form.imgUrl} alt='Poster' />
						)}
					</label>
					<input
						id='imgUrl'
						name='imgUrl'
						type='file'
						label='Картинка'
						// value=''
						className='absolute w-full opacity-0 h-full cursor-pointer'
						onChange={handleInput}
						accept='image/*'
						required
						// error={beenSubmitted && errors.imgUrl}
					/>
				</div> */}


				<div className='flex justify-between mt-10'>
					<Button type='submit' primary large>
							Створити
					</Button>
				</div>
			</form>
		</div>
	)
}

export default NewBrigade