import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
import GoalForm from '../components/GoalForm'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [quote, setQuote] = useState('');
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (goals.length === 0) {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => setQuote(data.content))
    }
  }, [goals]);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => { //return makes sure to do this when the component unmounts
      dispatch(reset()) 
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1> Goals  Dashboard</h1>
        <p>Write | Win | Repeat</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>" {quote} "</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
