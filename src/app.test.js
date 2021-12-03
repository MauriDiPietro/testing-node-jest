import app from './app.js';
import request from 'supertest';
import mongoose from 'mongoose';

describe('TEST AFTER CODER', ()=>{
  beforeEach(async()=>{
    await mongoose.connection.collections['messages'].drop()
  })

  it('Probando crear nuevo mensaje', async ()=>{
    const message = {
      sender: 'Sender1',
      message: 'Message1'
    }
    const response = await request(app).post('/messages').send(message)
    expect(response.body.sender).toBe(message.sender)
    expect(response.body.message).toBe(message.message)
    expect(response.statusCode).toBe(200)
  })

  it('Probando obtener todos los mensajes', async()=>{
    const message = {
      sender: 'Sender1',
      message: 'Message1'
    }
    await mongoose.models.Messages.create(message)
    const response = await request(app).get('/messages')
    expect(response.statusCode).toBe(200)
    expect(response.body.messages).toHaveLength(1)
    expect(response.body.messages[0].sender).toBe(message.sender)
  })

  it('Probando update', async()=>{
    const message = {
      sender: 'Sender1',
      message: 'Message1'
    }
    const responseMessage = await mongoose.models.Messages.create(message)
    const newMessage = {
      sender: 'Sender2',
      message: 'Message2'
    }
    const response = await request(app).put(`/messages/${responseMessage._id}`).send(newMessage)
    expect(response.statusCode).toBe(200)
    expect(response.body.modifiedCount).toBe(1)
  })

  it('Probando delete', async()=>{
    const message = {
      sender: 'Sender1',
      message: 'Message1'
    }
    const responseMessage = await mongoose.models.Messages.create(message)
    const response = await request(app).delete(`/messages/${responseMessage._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.deletedCount).toBe(1)
  })
})