import orgStyles from './Organizations.module.css';
import Form from '@/MuLearnComponents/Form/Form';
import { useNavigate,useParams } from 'react-router-dom';
import { deleteOrganization } from './apis';

function DeleteOrganizations() {

    const {id} = useParams()
    const navigate = useNavigate()

    function handleSubmit () {
        deleteOrganization(id as string)
        navigate('/dashboard/organizations')
    }
  return (
    <div className={orgStyles.deleteContainer}>
        <Form
                title={`Are you sure you want to delete ${id}?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/dashboard/organizations"}
            />
    </div>
  )
}

export default DeleteOrganizations
