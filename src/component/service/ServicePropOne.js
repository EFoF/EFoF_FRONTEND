import React from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../utils';
import ServiceData from '../../data/ServiceData.json';


const FeatureData = ServiceData[1];

const ServicePropOne = ({colSize, serviceStyle, itemShow, marginTop}) => {

	const topMargin = (index) => {
		if (marginTop === "yes") {
			if (index === 0) {
				return "mt--200 mt_md--0";
			} else if (index === 1) {
				return "mt--100 mt_md--0";
			}else {
				return "mt--0";
			}
		}else {
			return "";
		}
	}

    return (
		<>
			{FeatureData.slice(0, 3).map((data) => (
				<div className="col-xl-4 col-md-6" key={data.id}>
					<div className="services-grid">
						<div className="thumbnail">
							<img src={process.env.PUBLIC_URL + data.icon} alt="icon" />
						</div>
						<div className="content">
							<h5 className="title" dangerouslySetInnerHTML={{__html: data.title}}></h5>
							<p>{data.para}</p>
						</div>
					</div>
				</div>
			))}
		</>
    )
}

export default ServicePropOne;