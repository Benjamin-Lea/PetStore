import { useParams } from 'react-router-dom';
import PetComponent from './PetComponent';

function PetDetails() {
    const { id } = useParams();
    return (
        <div>
            <PetComponent id = {id} />
        </div>
    );
}
export default PetDetails;
