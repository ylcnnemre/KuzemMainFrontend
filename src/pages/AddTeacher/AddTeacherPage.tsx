import { Container } from 'reactstrap';
import AddTeacherComponent from '../../Components/AddTeacher/AddTeacherComponent';
import BreadCrumb from '../../Components/Common/BreadCrumb';


const AddTeacherPage = () => {
  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title={"Eğitmen Ekle"} />
        <AddTeacherComponent />
      </Container>

    </div>
  )
}

export default AddTeacherPage