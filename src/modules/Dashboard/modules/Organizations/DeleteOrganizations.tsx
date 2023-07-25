import orgStyles from './Organizations.module.css';
import Form from '@/MuLearnComponents/Form/Form';
import { useNavigate,useParams } from 'react-router-dom';
import { deleteOrganization } from './apis';
import { useToast } from '@chakra-ui/react'

function DeleteOrganizations() {

    const {id} = useParams()
    const toast = useToast()
    const navigate = useNavigate()

    function handleSubmit () {
        //console.log("Delete")
        deleteOrganization(id,toast)
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
