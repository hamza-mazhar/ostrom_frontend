import React, { useEffect, useState } from 'react';
import { Table,  Popconfirm, Form, Typography,
    Button, Modal,Divider } from 'antd';
import { createNewStudent, deleteStudent, getAllStudent, updateStudent } from "../services/apiCalls"
import StudentForm from "../components/StudentForm";
import EditableCell from "../components/editableCell";
import { Formatdate } from "../commons/utils";

interface Item {
    key: string;
    firstName: string;
    lastName: number;
    dob: string;
    course:string;
    price:string;
    _id:string;
    dateofbirth:string,
}

const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    let originData = [] as any;

    useEffect( () => {
        getAllStudent().then((studentData:any)=>{
            let {data} = studentData;
            //studentData.
            data.map((dataItem:any)=>{
                    return originData.push({
                        key: dataItem._id,
                        ...dataItem
                    });
                })
                setData(originData);
            }).catch(error=>{
                console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getData = (getDataStu:any) => {
        createNewStudent(getDataStu)
            .then(function (response) {
            console.log(response.data);
            let newData:any = [{
                key: response.data._id,
                ...response.data},...data]
            setData(newData)
            handleCancel()
        }).catch(function (error) {
                console.log(error);
        });
    }

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ firstName: '', lastName: '', price: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
   // error testing code for the user
    const deleteRecord = (record:any) => {

        deleteStudent(record._id)
            .then(function (response) {
            if(response.status=== 200){
                let afterRemoveData:any = data.filter((el:any) => {
                    return el._id !== record._id;
                });
                setData(afterRemoveData)
            }
        }).catch((error:any)=>{
            console.log(error)
        })
    }

    const save = async (key: React.Key) => {
        try {
            let row = (await form.validateFields()) as Item;
            const newData:any = [...data];
            const index = newData.findIndex((item:any) => key === item.key);
            let newDate:any = new Date(row.dateofbirth).toISOString()
             row.dob = newDate
            row = {
                ...row
            }
            updateStudent(row,editingKey)
                .then(function (response) {
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
            })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'FIRST NAME',
            dataIndex: 'firstName',
            editable: true,
        },
        {
            title: 'LAST NAME',
            dataIndex: 'lastName',
            editable: true,
        },
        {
            title: 'DATE OF BIRTH',
            dataIndex: 'dob',
            editable: true,
            render:Formatdate
        },
        {
            title: 'COURSE',
            dataIndex: 'course',
            editable: true,
        },
        {
            title: 'HOURS',
            dataIndex: 'hours',
            render: (data:any)=> data+" H",
            editable: true,
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            render: (data:any)=> data+" €",
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a href="/#" onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href="/#">Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <>
                        <Typography.Link  key={record._id} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Divider type="vertical" />
                        <Typography.Link   disabled={editingKey !== ''} onClick={() => deleteRecord(record)}>
                            Delete
                        </Typography.Link>
                    </>

                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'dob'? 'datetime':
                    col.dataIndex === 'price' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <div>
                <Button type="primary"
                        style={{background:"#00C1B1",marginBottom:"10px"}}
                        data-testid="btn-open-modal"
                        onClick={showModal}>Add Student</Button>
                <Modal   footer={null}
                         onCancel={() => handleCancel()}
                         key={"21321"}
                         title="Student Form" visible={isModalVisible}
                  width={1000}
                >
                    <StudentForm key={12323} getData={getData}/>
                </Modal>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowKey={(record:any) => record._id}
                    rowClassName="editable-row"
                    size={"small"}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>

    );
};

export default EditableTable;
