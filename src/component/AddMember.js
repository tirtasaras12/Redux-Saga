import React from 'react';
import { connect } from 'react-redux';
import { addChange, addMember, updateMember, loaderStart, getData, clearForm } from '../action';
import { Input, Form, Button, Spin } from 'antd';


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },

}

const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
};

class AddMember extends React.Component {

    componentDidMount() {
        if (this.props.history.location.state) {
            this.props.getData({
                id: this.props.history.location.state.data.id,
                nama: this.props.history.location.state.data.nama,
                image: this.props.history.location.state.data.image,
                status: this.props.history.location.state.status
            })
        }
    }

    addItem = async () => {
        const data = {
            nama: this.props.nama,
            image: this.props.image
        }
        this.props.addMember(data);
    }

    componentWillUnmount() {
        this.props.clearForm();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.goBack !== prevProps.goBack) {
            if (this.props.goBack) {
                this.props.history.goBack()
            }
        }
        return null;
    }

    updateItem = async () => {
        const data = {
            id: this.props.id,
            nama: this.props.nama,
            image: this.props.image
        }
        this.props.updateMember(data);
    }

    render() {
        const { addChange } = this.props;

        return (
            <Spin spinning={this.props.loading}>
                <Form layout="horizontal" >
                    <Form.Item label="Nama" {...formItemLayout}>
                        <Input placeholder="Type here"
                            onChange={e => {
                                e.preventDefault()
                                addChange({ key: 'nama', value: e.target.value })
                            }}
                            value={this.props.nama} />

                    </Form.Item>
                    <Form.Item label="Image" {...formItemLayout}>
                        <Input placeholder="Type here"
                            onChange={e => {
                                e.preventDefault()
                                addChange({ key: 'image', value: e.target.value })
                            }}
                            value={this.props.image} />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        {
                            this.props.status === 'tambah' ?
                                <Button htmlType="button" type="primary" onClick={this.addItem}>Add Data</Button>
                                :
                                <Button htmlType="button" type="primary" onClick={this.updateItem}>Update Data</Button>
                        }
                    </Form.Item>
                </Form>
            </Spin>

        );
    }
}

const mapStateToProps = ({ member }) => {
    const { id, nama, image, status, loading, goBack } = member
    return { id, nama, image, status, loading, goBack };
}

export default connect(
    mapStateToProps,
    {
        addChange,
        loaderStart,
        getData,
        clearForm,
        addMember,
        updateMember
    }
)(AddMember)
