import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pdf } from '../../schemas/pdf.model';
import Axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
require('dotenv').config();

@Injectable()
export class PdfService {
  constructor(@InjectModel(Pdf) private pdfModel: typeof Pdf) {}

  async uploadFile(files: Express.Multer.File) {
    const { buffer } = files;
    const url = 'https://sign.zoho.in/api/v1/requests';
    const payload = {
      requests: {
        request_type_id: '50200000000000171',
        request_name: 'ESign',
        actions: [
          {
            recipient_name: 'Role1',
            recipient_email: 'harsh.tiwari1995@gmail.com',
            recipient_phonenumber: '9663896862',
            recipient_countrycode: '+91',
            action_type: 'SIGN',
            private_notes: 'Please get back to us for further queries',
            signing_order: 0,
            verify_recipient: true,
            verification_type: 'EMAIL',
            verification_code: '',
          },
          {
            recipient_name: 'Role2',
            recipient_email: 'harshtiwari87541@gmail.com',
            recipient_phonenumber: '9663896862',
            recipient_countrycode: '+91',
            action_type: 'SIGN',
            private_notes: 'Please get back to us for further queries',
            signing_order: 1,
            verify_recipient: true,
            verification_type: 'EMAIL',
            verification_code: '',
          },
        ],
        expiration_days: 2,
        is_sequential: false,
        email_reminders: true,
        reminder_period: 8,
        folder_id: '50200000000029137',
      },
    };
    let file: string | Blob;
    const formData = new FormData();
    try {
      const filePath =
        'C:/Users/Call4Help/Coding/Esign/backend/src/modules/pdf/service/pdf/sample.pdf';
      const data = fs.readFileSync(filePath, 'utf8');
      file = data;
    } catch (err) {
      console.error('Error reading the file:', err);
    }
    // formData.append('file', JSON.stringify(file));
    formData.append('file', JSON.stringify(buffer));
    formData.append('data', JSON.stringify(payload));
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
    };
    try {
      const data = await Axios.post(url, formData, { headers });
      return data;
    } catch (e) {
      return e.response.data;
    }
  }

  async update(id: BigInt) {
    const doc = await this.pdfModel.findAll({
      where: {
        request_id: id,
      },
    });
    const url = `https://sign.zoho.in/api/v1/requests/${id}`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',

      Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
    };
    const payload = {
      requests: {
        actions: [
          {
            verify_recipient: true,
            action_type: 'SIGN',
            private_notes: 'Please get back to us for further queries',
            verification_type: 'EMAIL',
            recipient_phonenumber: '9663896862',
            recipient_name: 'Role1',
            recipient_email: 'harsh.tiwari1995@gmail.com',
            // in_person_name: 'Lalit',
            // in_person_email: 'lalitkumar171968@gmail.com',
            action_id: `${doc[0].action_id}`,
            signing_order: 0,
            fields: {
              text_fields: [
                {
                  document_id: `${doc[0].document_id}`,
                  field_label: 'SIGN',
                  field_name: 'Full name',
                  abs_width: 80,
                  abs_height: 16,
                  x_coord: 90,
                  y_coord: 300,
                  page_no: 0,
                  is_mandatory: true,
                  text_property: {
                    font: 'Arial',
                    font_size: 11,
                    font_color: '000000',
                    is_bold: false,
                    is_italic: false,
                    is_read_only: false,
                  },
                  name_format: 'FULL_NAME',
                  field_type_name: 'Name',
                },
                {
                  document_id: `${doc[0].document_id}`,
                  field_name: 'Email',
                  abs_width: 80,
                  abs_height: 16,
                  x_coord: 200,
                  y_coord: 300,
                  page_no: 0,
                  is_mandatory: true,
                  text_property: {
                    font: 'Arial',
                    font_size: 11,
                    font_color: '000000',
                    is_bold: false,
                    is_italic: false,
                  },
                  field_type_name: 'Email',
                },
              ],
            },
            recipient_countrycode: '+91',
            deleted_fields: [],
          },
          {
            verify_recipient: true,
            action_type: 'SIGN',
            private_notes: 'Please get back to us for further queries',
            verification_type: 'EMAIL',
            recipient_phonenumber: '9663896862',
            recipient_name: 'Role2',
            recipient_email: 'harshtiwari87541@gmail.com',
            // in_person_name: 'Lalit',
            // in_person_email: 'lalitkumar171968@gmail.com',
            action_id: `${doc[1].action_id}`,
            signing_order: 1,
            fields: {
              text_fields: [
                {
                  document_id: `${doc[0].document_id}`,
                  field_label: 'SIGN',
                  field_name: 'Full name',
                  abs_width: 80,
                  abs_height: 16,
                  x_coord: 90,
                  y_coord: 250,
                  page_no: 0,
                  is_mandatory: true,
                  text_property: {
                    font: 'Arial',
                    font_size: 11,
                    font_color: '000000',
                    is_bold: false,
                    is_italic: false,
                    is_read_only: false,
                  },
                  name_format: 'FULL_NAME',
                  field_type_name: 'Name',
                },
                {
                  document_id: `${doc[0].document_id}`,
                  field_name: 'Email',
                  abs_width: 80,
                  abs_height: 16,
                  x_coord: 200,
                  y_coord: 250,
                  page_no: 0,
                  is_mandatory: true,
                  text_property: {
                    font: 'Arial',
                    font_size: 11,
                    font_color: '000000',
                    is_bold: false,
                    is_italic: false,
                  },
                  field_type_name: 'Email',
                },
              ],
            },
            recipient_countrycode: '+91',
            deleted_fields: [],
          },
        ],
        deleted_actions: [],
        request_name: 'ESign',
      },
    };
    const form = new FormData();
    form.append('data', JSON.stringify(payload));

    try {
      const data = await Axios({
        method: 'PUT',
        url,
        data: form,
        headers,
      });
      const updateStatus = {
        status: data.data.requests.request_status,
        message: data.data.message,
      };
      this.pdfModel.update(updateStatus, { where: { request_id: id } });
      return data.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async list() {
    console.log(process.env.ACCESS_TOKEN);
    const d = await this.pdfModel.findAll();
    const arrayId = d.map((el) => el.request_id);
    let unique = [...new Set(arrayId)];
    const url = `https://sign.zoho.in/api/v1/requests`;
    const headers = {
      Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
    };
    let data: AxiosResponse<any, any>;
    try {
      data = await Axios({
        method: 'GET',
        url,
        headers,
      });
    } catch (e) {
      console.log(e.response.data);
    }

    function getRequestStatus(requests: any, requestId: string) {
      for (const request of requests) {
        if (request.request_id === requestId) {
          return request.request_status;
        }
      }
      return 'Request ID not found';
    }
    const statuses = unique.map((requestId) => {
      const status = getRequestStatus(data.data.requests, requestId);
      return { requestId, status };
    });
    statuses.map((el) =>
      this.pdfModel.update(
        { status: el.status },
        { where: { request_id: el.requestId } },
      ),
    );
    return await this.pdfModel.findAll();
  }

  async submit(id: BigInt) {
    console.log(id);
    const url = `https://sign.zoho.in/api/v1/requests/${id}/submit`;
    const headers = {
      Authorization: `Zoho-oauthtoken ${process.env.ACCESS_TOKEN}`,
    };
    try {
      const data = await Axios({
        method: 'POST',
        url,
        headers,
      });
      const updateStatus = {
        status: data.data.requests.request_status,
        message: data.data.message,
      };
      this.pdfModel.update(updateStatus, { where: { request_id: id } });
      return data.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async uploadResponse(body: {
    requests: {
      actions: string | any[];
      request_id: any;
      owner_id: any;
      document_ids: { document_id: any }[];
      request_status: any;
    };
    message: any;
  }) {
    const {
      requests: { actions },
    } = body;
    console.log(actions.length)
    for (let i = 0; i <= actions.length - 1; i++) {
      await this.pdfModel.create({
        action_id: body.requests.actions[i].action_id,
        request_id: body.requests.request_id,
        owner_id: body.requests.owner_id,
        document_id: body.requests.document_ids[0].document_id,
        meta: body,
        status: body.requests.request_status,
        message: body.message,
      });
    }
  }
}
