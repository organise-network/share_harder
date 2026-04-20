import React, { PropTypes } from 'react';
import Card from '@material-ui/core/Paper';
import makeBubble from '../lib/makeBubble'

import AnimateOnChange from 'react-animate-on-change';

const styles = {
  div: { width: '100%', display: 'inline-block', margin: '20px', position: 'relative' },
  image: { width: '100%' },
  title: { fontSize: '0.75em', margin: '0 3px 0 3px'},
  description: { fontSize: '0.55em', margin: '0 3px 0 3px' },
  statsBox: {
    display: 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
  },
  statHeadline: {
    fontSize: '2.5em',
    fontWeight: '700'
  },
  winner: {
    border: '1px solid red'
  }
}

class BubbleNumber extends React.Component {

  componentWillUpdate(nextProps, nextState) {
    const newOnes = nextProps.value - this.props.value
    const { icon } = this.props
    if (newOnes > 0) {
      const $el = $(this.props.parentRef.current).find('.variant-preview')
      for (var i=0;i < newOnes;i++) {
        setTimeout(function(){makeBubble($el, icon)}, Math.random()*5000)
      }
    }
  }

  render () {
    return <span>{this.props.value}</span>
  }
}

export default class VariantResults extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    const { highRange, lowRange } = this.props;
    const { title, description, share_count, click_count, goal_count, proportion, confidence_interval } = this.props.variant
    const image_url = this.props.variant.template_image.url

    return (
      <div className='row align-items-center' style={proportion > 0.9 ? styles.winner : {}} ref={this.ref}>
        <div className='col-md-3 col-xs-3'>
          <Card style={styles.div} className='variant-preview'>
            <img src={image_url} style={styles.image} />
            <div style={styles.title} className='title'>{title}</div>
            <div style={styles.description} className='description'>{description}</div>
          </Card>
        </div>
        <div className='col-md-3 col-xs-3 text-center' style={styles.statsBox}>
          <div>
            <BubbleNumber value={share_count} icon='share' parentRef={this.ref}/><br />
            <span>Shares</span><br />
            <BubbleNumber value={click_count} icon='click' parentRef={this.ref}/><br />
            <span>Clicks</span><br />
            <BubbleNumber value={goal_count} icon='goal' parentRef={this.ref}/><br />
            <span>Goals</span>
          </div>
        </div>
        <div className='col-md-3 col-xs-3 text-center'>
            <div style={styles.statHeadline}>{(proportion * 100).toFixed(1)}%</div>
            <div>traffic allocation</div>
        </div>
        <div className='col-md-3 col-xs-3 text-center'>
          <div style={styles.statHeadline}>{Math.max(confidence_interval[0], 0).toFixed(2)} - {confidence_interval[1].toFixed(2)}</div>
          <div>goals per share</div>
        </div>
      </div>
    );
  }
}
