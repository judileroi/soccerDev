import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const GridListImages = ({images}) =>{
    return (
        <div className="album">
        <div className="root">
          <GridList cellHeight={200} spacing={1} className="gridList">
            {images.map((image,index) => (
              <GridListTile key={image.id} cols={index ==0 ? 2 : 1} rows={index ==3 ? 2 : 1}>
                <img src={'uploads/'+image.path} alt={image.path} />
                <GridListTileBar
                  titlePosition="top"
                  actionIcon={
                    <IconButton title="Mettre au premier plan" className="icon" color="primary">
                        <Icon>favorite</Icon>
                    </IconButton>
                  }
                  actionPosition="left"
                  className="titleBar"
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        </div>
      );
}

GridListImages.propTypes ={
    images :PropTypes.object.isRequired
}

export default GridListImages