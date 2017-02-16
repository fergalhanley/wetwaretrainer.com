import React, {PropTypes} from 'react';

export const Loading = ({description}) => (
    <div>
        {description}<br/>
        <img src="/assets/images/loader-light.gif" role="presentation"/>
    </div>
);

Loading.propTypes = {
    description: PropTypes.string.isRequired
};

export default Loading;
