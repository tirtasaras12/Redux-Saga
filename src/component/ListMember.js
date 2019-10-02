import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loaderStart, handleChange, getMember, deleteMember } from '../action';
import { Alert, Input, Form, Button, Row, Col, Table, Modal, Spin } from 'antd';


const { Search } = Input;
const { confirm } = Modal;

class ListMember extends React.Component {

    componentDidMount() {
        this.props.getMember();
    }

    componentDidUpdate(prevProps){
        if(this.props.deleted !== prevProps.deleted){
            if(this.props.deleted){
                this.props.getMember();
            }
        }
        return null;
    }

    handleSubmit = async value => {
        this.props.handleChange(value);
    }

    showConfirm = (id) => {
        confirm({
            title: 'Do you want to delete these items?',
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk: () => {
                this.props.deleteMember({id: id})
                Modal.destroyAll()
            },
            onCancel() { },
        });
    }

    // deleteItem = async (id) => {
    //     const response = await fetch('http://10.1.17.192:3000/artist/' + id, {
    //         method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     });
    //     return await response.json();
    // }

    render() {
        const { listMember } = this.props;

        const columns = [
            {
                title: 'Name',
                dataIndex: 'nama',
            },
            {
                title: 'Image',
                dataIndex: 'image',
                render: (text, record, index) =>
                    <img className="img" src={text} alt="" />
            },

            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Button type="primary" icon="edit" onClick={() => this.props.history.push('/add', {
                                data: record,
                                status: "edit"
                            })}>Update</Button>
                            <Button type="danger" icon="delete" onClick={() => this.showConfirm(record.id)} >Delete</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                {this.props.message !== "" &&
                    <Alert
                        message="Warning"
                        description={this.props.message}
                        type="warning"
                        showIcon
                    />
                }
                <Form layout="horizontal">
                    <Row>
                        <Col span={20}>
                            <Search
                                onChange={e => {
                                    e.preventDefault()
                                    if (e.target.value.length === 0) {
                                        this.props.getMember()
                                    }
                                }}
                                onSearch={value => this.handleSubmit(value)} enterButton>
                            </Search>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={3}>
                            <Link to="/add">
                                <Button type="primary">
                                    Add Data
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
                <Spin spinning={this.props.loading}>
                    <Table columns={columns} dataSource={listMember} size="middle" />
                </Spin>
            </div >
        );
    }
}

const mapStateToProps = ({ member }) => {
    const { searchText, message, listMember, loading, id, deleted } = member;
    return { searchText, message, listMember, loading, id, deleted };
}

export default connect(
    mapStateToProps,
    {
        handleChange,
        getMember,
        loaderStart,
        deleteMember
    }
)(ListMember)