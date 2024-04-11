import { Placeholder } from 'react-bootstrap';

function Placeholders() {
    const length = 10;

    return (
        Array.from({ length: length }, (_, rowIndex) => (
            <tr key={rowIndex}>
                <td colSpan={12}>
                    <Placeholder lg={12} />
                </td>
            </tr>
        ))
    )
}

export default Placeholders