import Modal from './Modal/Modal'
import EditUserForm from './EditUserForm'

import { Edit } from '@mui/icons-material'

function EditUserTrigger({ data }) {
  return (
    <Modal>
      <Modal.Open opens="editUserForm">
        <button className="rounded bg-dark-lighterbg px-2 py-1 text-white transition-all">
          <Edit fontSize="very-small" />
        </button>
      </Modal.Open>

      <Modal.Window name="editUserForm">
        <EditUserForm userData={data} />
      </Modal.Window>
    </Modal>
  )
}

export default EditUserTrigger
