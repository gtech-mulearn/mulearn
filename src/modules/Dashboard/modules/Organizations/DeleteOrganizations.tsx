import React from 'react'
import './Organizations.scss';
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
        navigate('/organizations')
    }
  return (
    <div className="delete_container">
        <Form
                title={`Are you sure you want to delete ${id}?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/organizations"}
            />
    </div>
  )
}

export default DeleteOrganizations
