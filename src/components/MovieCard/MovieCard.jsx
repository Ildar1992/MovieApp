import React from 'react';
import { Spin, Card, Tag, Rate } from 'antd';
import { format } from 'date-fns';
import './MovieCard.css';

export default class MovieCard extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    const imgPoster = 'https://orac-ural.ru/wp-content/uploads/2018/01/placeholder_1000x1280.jpg';
    const linkImage = data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : imgPoster;
    if (!loading) {
      let picture = new Image();
      picture.src = linkImage;
      picture.onload = () => {
        this.setState({ loading: true });
      };
    }

    const imageLoader = loading ? (
      <img src={data.poster_path ? linkImage : imgPoster} />
    ) : (
      <Spin className="spin" size="large" />
    );

    return (
      <>
        <Card>
          <div className="card">
            <div className="card__img-body">{imageLoader}</div>
            <div className="card__info">
              <div className="card__header">
                <div className="card__name">
                  <h5>{data.title}</h5>
                </div>
                <div className="card__marks">
                  <span>{data.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <p className="card__date">
                {data.release_date ? format(new Date(data.release_date), 'MMMM d, yyyy') : 'none'}
              </p>
              <Tag>Drama</Tag>
              <Tag>Action</Tag>
              <p className="card__text">{data.overview}</p>
              <Rate className="card__rate" defaultValue={0} count={10} allowHalf />
            </div>
          </div>
        </Card>
      </>
    );
  }
}

// import React from 'react';
// import { Spin, Card, Tag, Rate } from 'antd';
// import { format } from 'date-fns';
// import './MovieCard.css';

// export default class MovieCard extends React.Component {
//   state = {
//     loading: false,
//   };

//   render() {
//     const { data } = this.props;
//     const { loading } = this.state;
//     const imgPoster = 'https://orac-ural.ru/wp-content/uploads/2018/01/placeholder_1000x1280.jpg';
//     const linkImage = data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : imgPoster;
//     if (!loading) {
//       let picture = new Image();
//       picture.src = linkImage;
//       picture.onload = () => {
//         this.setState({ loading: true });
//       };
//     }

//     const imageLoader = loading ? (
//       <img src={data.poster_path ? linkImage : imgPoster} />
//     ) : (
//       <Spin className="spin" size="large" />
//     );

//     return (
//       <>
//         <Card>
//           <div className="card">
//             <div className="card__img-body">{imageLoader}</div>
//             <div className="card__info">
//               <div className="card__header">
//                 <div className="card__name">
//                   <h5>{data.title}</h5>
//                 </div>
//                 <div className="card__marks">
//                   <span>{data.vote_average.toFixed(1)}</span>
//                 </div>
//               </div>
//               <p className="card__date">
//                 {data.release_date ? format(new Date(data.release_date), 'MMMM d, yyyy') : 'none'}
//               </p>
//               <Tag>Drama</Tag>
//               <Tag>Action</Tag>
//               <p className="card__text">{data.overview}</p>
//               <Rate className="card__rate" defaultValue={0} count={10} allowHalf />
//             </div>
//           </div>
//         </Card>
//       </>
//     );
//   }
// }
