import React from 'react';
//import { Fragment, FormGroup, Control } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// const Styles = {
//     typehead: {
//         minWidth: '200px',
//         maxWidth: '300px',
//     }
// }

class typehead extends React.Component {

    render() {
        const { options, onChange, multiple, placeholder, selected = [] } = this.props;
        return (
            //<div style={Styles.typehead}>
            <Typeahead
                placeholder={placeholder}
                multiple={multiple}
                onChange={onChange}
                options={options}
                selected={selected}
                caseSensitive
            />
            //</div>
        );
    }
}

export default typehead;
