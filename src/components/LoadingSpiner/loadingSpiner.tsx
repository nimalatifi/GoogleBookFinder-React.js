import * as React from 'react';
import "./loadingSpiner.scss";
class LoadingSpinner extends React.Component {
    render() {
        return (
            <div className="loader-container hide">
                <div className="loader"></div>
            </div>

        )
    }
}
export default LoadingSpinner
