import React, { Component } from 'react';
import { View, Text, TextInput, Button} from 'react-native';

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>
            Notlarin
        </Text>
        <TextInput
            placeholder = "Bir Şey Yaz"
            numberOfLines={8}
        >
        </TextInput>
        <Button
            title = "Tıkla"
        >
        </Button>
      </View>
    );
  }
}





/*

import React, { Component } from 'react';
import { SafeAreaView, ViewPropTypes, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import PropTypes from 'prop-types';

import CommentInput from '../components/CommentInput.js';
import CommentList from '../components/CommentList.js';

const ASYNC_STORAGE_COMMENTS_KEY = 'ASYNC_STORAGE_COMMENTS_KEY';

export class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsForItem: {},
            showModal: false,
            selectedItemId: null,
        };
    }
    async componentDidMount() {
        try {
          const commentsForItem = await AsyncStorage.getItem(
            ASYNC_STORAGE_COMMENTS_KEY,
          );
          this.setState({
            commentsForItem: commentsForItem
              ? JSON.parse(commentsForItem)
              : {},
          });
        } catch (e) {
          console.log('Failed to load comments');
        }
      }

    closeCommentScreen = () => {
        this.setState({
            showModal: false,
            selectedItemId: null,
        });
    };
    onSubmitComment = async text => {
        const { selectedItemId, commentsForItem } = this.state;
        const comments = commentsForItem[selectedItemId] || [];

        const updated = {
            ...commentsForItem,
            [selectedItemId]: [...comments, text],
        };

        this.setState({ commentsForItem: updated });

        try {
            await AsyncStorage.setItem(
                ASYNC_STORAGE_COMMENTS_KEY,
                JSON.stringify(updated),
            );
        } catch (e) {
            console.log(
                'Failed to save comment',
                text,
                'for',
                selectedItemId,
            );
        }
    };
    render() {
        const { commentsForItem, showModal, selectedItemId } = this.state;
        return (
            <SafeAreaView style={styles.comments}>
                <CommentInput
                    placeholder="Leave a comment"
                    onSubmit={this.onSubmitComment}
                />
                <CommentList items={commentsForItem[selectedItemId] || []} />
            </SafeAreaView>
        );
    }
}


Notes.propTypes = {
    style: ViewPropTypes.style,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmitComment: PropTypes.func.isRequired,
};
Notes.defaultProps = {
    style: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    comments: {
        flex: 1,
        marginTop:
            Platform.OS === 'ios' && platformVersion < 11
                ? Constants.statusBarHeight
                : 0,
    },

});

*/