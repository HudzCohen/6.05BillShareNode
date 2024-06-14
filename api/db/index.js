const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');

const config = {
    database: 'BillShare',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addParticipant = async participant => {
    await sql.connect(config);

    const { name, email } = participant;
    await sql.query`INSERT INTO Participants (Name, Email) 
        VALUES(${name}, ${email})`;

    await sql.close();
}

const getParticipants = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Participants`;
    await sql.close();
    return recordset;
}

const addBill = async ({participantsId, amount}) => {

    const billId = await getBillId(amount);
    let fullQuery = ' ';
    {participantsId.map(p => {
      fullQuery += `\n INSERT INTO ParticipantBills (BillId, ParticipantId) VALUES (${billId}, ${p}) `;
    })}
    await sql.connect(config);
    await sql.query(fullQuery);
    await sql.close();
}

const getBills = async () => {
    await sql.connect(config);
    const {recordset} = await sql.query`SELECT b.*, COUNT(*) AS 'ParticipantCount' 
                                   FROM Bills b 
                                   LEFT JOIN ParticipantBills pb
                                   ON b.Id = pb.BillId
                                   GROUP BY b.Id, b.Amount, b.Date`;
    await sql.close();
    return recordset;
}

const getBillDetails = async (Id) => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.*, p.Name FROM Bills b
                                          JOIN ParticipantBills pb
                                          ON b.Id = pb.BillId
                                          JOIN Participants p
                                          ON pb.ParticipantId = p.Id
                                          WHERE BillId = 19`
    await sql.close();
    return recordset;
}


const getBillId = async (amount) => {
    await sql.connect(config);
    const { recordset } = await sql.query`INSERT INTO Bills (Date, Amount) VALUES (GETDATE(), ${amount}) SELECT SCOPE_IDENTITY() AS 'Id'`;
    await sql.close();
    return recordset.length ? recordset[0].Id : null;
}

module.exports = { addParticipant, getParticipants, addBill, getBills, getBillDetails };