import React, {useState, useMemo, useEffect, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from "react-csv";
import {Container, Row, Col, Breadcrumb, Form, Alert, Card, Collapse, Button} from 'react-bootstrap';
import STUDENTS from "../assets/student.json";
import {columns_student} from "../components/columns_table";
import TableContainer from '../components/table';

export const Search = () => {
    //Data
    const data = useMemo(() => STUDENTS, [])
    const [selectedRows, setSelectedRows] = useState('');
    const [dataset, setDataSet] = useState(data);
    const [dataSelected, setDataSelected] = useState([])
    const columns = useMemo(() => columns_student, [])
    const [totalResult, setTotalResult] = useState(data.length)
    const [DownloadReady, setDownloadReady] = useState(false);
    const cvsLink = useRef()

    // Collapse More Filters
    const [openSAT, setOpenSAT] = useState(false);
    const [openGPA, setOpenGPA] = useState(false);
    const [openCredits, setOpenCredits] = useState(false);
    const [openRate, setOpenRate] = useState(false);
    const [openWarnings, setOpenWarnings] = useState(false);

    //Risk Level
    const [maxRisk, setMaxRisk] = useState(100)
    const [minRisk, setMinRisk] = useState(0)
    const [showAlertRisk, setAlertRisk] = useState(false)

    // Program
    const [checkedProgram, setcheckedProgram] = useState(new Array(3).fill(true));
    
    // Years of Admission
    const [maxYear, setMaxYear] = useState(2022)
    const [minYear, setMinYear] = useState(2013)
    const [showAlertYear, setAlertYear] = useState(false)
    
    // Gender
    const [checkedGender, setCheckedGender] = useState(new Array(2).fill(true))
    
    // SAT
    // Math
    const [maxSATMath, setMaxSATMath] = useState(850)
    const [minSATMath, setMinSATMath] = useState(524)
    const [showAlertSATMath, setAlertSATMath] = useState(false)
    //Verbal
    const [maxSATVerbal, setMaxSATVerbal] = useState(850)
    const [minSATVerbal, setMinSATVerbal] = useState(399)
    const [showAlertSATVerbal, setAlertSATVerbal] = useState(false)

    // GPA
    const [maxGPA, setMaxGPA] = useState(7.0)
    const [minGPA, setMinGPA] = useState(1.0)
    const [showAlertGPA, setAlertGPA] = useState(false)

    // Credits
    //Passed
    const [maxPassedCredits, setMaxPassedCredits] = useState(302)
    const [minPassedCredits, setMinPassedCredits] = useState(0)
    const [showAlertPassedCredits, setAlertPassedCredits] = useState(false)
    //Failed
    const [maxFailCredits, setMaxFailCredits] = useState(76)
    const [minFailCredits, setMinFailCredits] = useState(0)
    const [showAlertFailCredits, setAlertFailCredits] = useState(false)

    //Professor Rate
    const [maxProfRate, setMaxProfRate] = useState(7.0)
    const [minProfRate, setMinProfRate] = useState(1.0)
    const [showAlertProfRate, setAlertProfRate] = useState(false)

    //Warnings
    const [maxWarnings, setMaxWarnings] = useState(6)
    const [minWarnings, setMinWarnings] = useState(0)
    const [showAlertWarnings, setAlertWarnings] = useState(false)

    //Detecting Changes
    const [refreshTable, setRefreshtable] = useState(0)

    //DicData
    useEffect(()=> {
        if(refreshTable>0){updateTable()}
    }, [refreshTable])

    function updateTable() {
        //Risk
        let final = data.filter(students=>{
            let test_filter = false;
            test_filter = parseFloat(students.positive_risk)>=minRisk && parseFloat(students.positive_risk)<=maxRisk;
            return(test_filter);
        })

        //Program
        const programas = ['IC', 'IICG', 'CA']
        let selected_programs = checkedProgram.map((item,index) => item === true ? programas[index] : "")
        final = final.filter(students=>{
            let test_filter = false;            
            test_filter = selected_programs.includes(students.program)
            return (test_filter);
        })

        //Year Entry
        final = final.filter(students=>{
            let test_filter = false;
            test_filter = parseFloat(students.year_entry)>=minYear*10 && parseFloat(students.year_entry)<=(maxYear*10+2)
            return(test_filter);
        })

        //Gender
        const genders = ['MASCULINO', 'FEMENINO']
        let selected_genders = checkedGender.map((item,index) => item === true ? genders[index]: "")
        final = final.filter(final=>{
            let test_filter = false;
            test_filter = selected_genders.includes(final.Genero)
            return(test_filter);
        })

        if(openSAT){
            final = final.filter(students=>{
                let test_filter = false;
                test_filter = (parseFloat(students.SAT_Math)>=minSATMath && parseFloat(students.SAT_Math)<=maxSATMath) && (parseFloat(students.SAT_Verbal)>=minSATVerbal && parseFloat(students.SAT_Verbal)<=maxSATVerbal)
                return(test_filter);
            })
        }

        if(openGPA){
            final = final.filter(students=>{
                let test_filter = false;
                test_filter = (parseFloat(students.GPA_high_school)>=minGPA && parseFloat(students.GPA_high_school)<=maxGPA)
                return(test_filter);
            })
        }
        
        if(openCredits){
            final = final.filter(students=>{
                let test_filter = false;
                test_filter = (parseFloat(students.passed_credits)>=minPassedCredits && parseFloat(students.passed_credits)<=maxPassedCredits) && (parseFloat(students.failed_credits)>=minFailCredits && parseFloat(students.failed_credits)<=maxFailCredits)
                return(test_filter);
            })
        }

        if(openRate){
            final = final.filter(students=>{
                let test_filter = false;
                test_filter = (parseFloat(students.professor_rate)>=minProfRate && parseFloat(students.professor_rate)<=maxProfRate)
                return(test_filter);
            })
        }

        if(openWarnings){
            final = final.filter(students=>{
                let test_filter = false;
                test_filter = (parseFloat(students.total_prev_warnings)>=minWarnings && parseFloat(students.total_prev_warnings)<=maxWarnings)
                return(test_filter);
            })
        }

        setDataSet(final)
        setTotalResult(final.length)
    };


    const FilterDataProgram = (position) => {
        const updatedProgram = checkedProgram.map ((item, index) => index === position ? !item : item);
        // UpdateTable
        setcheckedProgram(updatedProgram)
        setRefreshtable(refreshTable=>refreshTable+1)
    }

    const FilterBound = (e, bound, type, setFunction, setAlert) =>{
        if (type.includes('upper')){
            if (parseFloat(e)>parseFloat(bound)){
                e=bound
                setAlert(true)
            }else{setAlert(false)}
        }else{
            if (parseFloat(e)<parseFloat(bound)){
                e=bound
                setAlert(true)
            }else{setAlert(false)}
        }
        //UpdateTable
        setFunction(parseFloat(e))
        setRefreshtable(refreshTable=>refreshTable+1)
    }

    const FilterGender = (position) => {
        const updatedGender = checkedGender.map ((item, index) => index === position ? !item : item);
        // UpdateTable
        setCheckedGender(updatedGender)
        setRefreshtable(refreshTable=>refreshTable+1)
    }

    const updateSelectedRowIds = (prompt) => {
        setSelectedRows(prompt)
    }

    const updateOpens = (setOpen, value) => {
        setOpen(value)
        if(!value){
            setRefreshtable(refreshTable=>refreshTable+1)
        }
    }

    const checkSelection =async () => {
        const sel = Object.keys(selectedRows)
        const datas = []
    
        if (sel.length===0){
            alert('No student selected. Please, select the students you want retreive their information.')
        }else{
            for(const id in sel){
                sel[id] = parseInt(sel[id])
                datas.push(data[sel[id]])
            }
            setDataSelected(datas);
            setDownloadReady(true);
        }
    }

    useEffect(() => {
        if (cvsLink && cvsLink.current && DownloadReady){
            cvsLink.current.link.click();
            setDownloadReady(false);
        }
    }, [DownloadReady]);

    return(
        <>
        <Container fluid style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                    <Breadcrumb.Item active>Results</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <Col lg={2}>
                <Card>
                <Card.Header><h5>Filters</h5></Card.Header>
                <Card.Body> 
                            <Form.Group style={{width: "100%", align: 'center'}}>
                                <Form.Label><b>Risk Level</b></Form.Label><br/>
                                Max Risk: {maxRisk}
                                <Form.Range id='maxRisk' value = {maxRisk} min="0" max="100" onChange={(e)=>{FilterBound(e.target.value, minRisk, 'lower', setMaxRisk, setAlertRisk)}}/>
                                Min Risk: {minRisk}
                                <Form.Range value = {minRisk} min="0" max="100" onChange={(e)=> FilterBound(e.target.value, maxRisk, 'upper', setMinRisk, setAlertRisk)}/>
                                <Alert show={showAlertRisk} variant='danger'>
                                    <em>Min risk</em> <b>cannot be greater than</b> <em>Max risk</em>!
                                </Alert>
                            </Form.Group>
                    {/* <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
                        <Accordion.Item eventKey="0">
                        <Accordion.Header box-shadow="none"><b>Program</b></Accordion.Header>
                        <Accordion.Body> */}
                            <Form.Group>
                                <Form.Label><b>Program</b></Form.Label><br/>
                                <Form.Check label='IC' id='IC' checked={checkedProgram[0]} onChange={()=>FilterDataProgram(0)} inline></Form.Check>
                                <Form.Check label='ICCG' id='IICG' checked={checkedProgram[1]} onChange={()=>FilterDataProgram(1)} inline></Form.Check>
                                <Form.Check label='CA' id='CA' checked={checkedProgram[2]} onChange={()=>FilterDataProgram(2)} inline></Form.Check>
                            </Form.Group>
                        {/* </Accordion.Body>
                        </Accordion.Item>
                         */}
                        <br/>
                        {/* <Accordion.Item eventKey="1">
                        <Accordion.Header><b>Year of Admission</b></Accordion.Header>
                        <Accordion.Body> */}
                            {/* <b>Year of Admission</b>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column >
                                    Max Year:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="input" placeholder={maxYear} onChange={(e)=> FilterBound(e.target.value, minYear, 'lower', setMaxYear, setAlertYear)}/>
                                </Col>
                                </Form.Group> */}
                            <Form.Group style={{width: "100%", align: 'center'}}>
                                <Form.Label><b>Year of Admission</b></Form.Label><br/>
                                Max Year: {maxYear}
                                <Form.Range id='maxYear' value = {maxYear} min="2013" max="2022" onChange={(e)=>{FilterBound(e.target.value, minYear, 'lower', setMaxYear, setAlertYear)}}/>
                                Min Year: {minYear}
                                <Form.Range value = {minYear} min="2013" max="2022" onChange={(e)=> FilterBound(e.target.value, maxYear, 'upper', setMinYear, setAlertYear)}/>
                                <Alert show={showAlertYear} variant='danger'>
                                    <em>Min year</em> <b>cannot be greater than</b> <em>Max year</em>!
                                </Alert>
                            </Form.Group>
                        {/* </Accordion.Body>
                        </Accordion.Item> */}
                        <br/>

                        {/* <Accordion.Item eventKey="2">
                        <Accordion.Header><b>Gender</b></Accordion.Header>
                        <Accordion.Body> */}
                            <Form.Group>
                                <Form.Label><b>Gender</b></Form.Label><br/>
                                <Form.Check id='Male' label='Male' checked={checkedGender[0]} onChange={()=>FilterGender(0)} inline></Form.Check>
                                <Form.Check id='Female' label='Female' checked={checkedGender[1]} onChange={()=>FilterGender(1)} inline></Form.Check>
                            </Form.Group>
                        {/* </Accordion.Body>
                        </Accordion.Item> */}
                        <br/>

                        <b><Form.Check label='SAT Scores' type="switch" id="custom-switch-SAT" onChange={()=>updateOpens(setOpenSAT,!openSAT)} inline/></b>
                        <Collapse in={openSAT}>
                            <div id='controlSAT'>
                                <Form.Group style={{width: "90%", align: 'center'}}>
                                    <Form.Label><em>Math</em></Form.Label><br/>
                                    Max Score: {maxSATMath}
                                    <Form.Range value = {maxSATMath} min="524" max="850" onChange={(e)=> FilterBound(e.target.value, minSATMath, 'lower',  setMaxSATMath,  setAlertSATMath)}/>
                                    Min Score: {minSATMath}
                                    <Form.Range value = {minSATMath} min="524" max="850" onChange={(e)=> FilterBound(e.target.value, maxSATMath, 'upper',  setMinSATMath, setAlertSATMath)}/>
                                    <Alert show={showAlertSATMath} variant='danger'>
                                        <em>Min score</em> <b>cannot be greater than</b> <em>Max score</em>!
                                    </Alert>
                                </Form.Group>
                                <br/>
                                <Form.Group style={{width: "90%", align: 'center'}}>
                                    <Form.Label><em>Verbal</em></Form.Label><br/>
                                    Max Score: {maxSATVerbal}
                                    <Form.Range value = {maxSATVerbal} min="524" max="850" onChange={(e)=> FilterBound(e.target.value, minSATVerbal, 'lower',  setMaxSATVerbal,  setAlertSATVerbal)}/>
                                    Min Score: {minSATVerbal}
                                    <Form.Range value = {minSATVerbal} min="524" max="850" onChange={(e)=> FilterBound(e.target.value, maxSATVerbal, 'upper',  setMinSATVerbal, setAlertSATVerbal)}/>
                                    <Alert show={showAlertSATVerbal} variant='danger'>
                                        <em>Min score</em> <b>cannot be greater than</b> <em>Max score</em>!
                                    </Alert>
                                </Form.Group>
                            </div>
                        </Collapse>
                    {/* </Accordion> */}
                        <br/>
                        <b><Form.Check label='GPA High School' type="switch" id="custom-switch-GPA" onChange={()=>updateOpens(setOpenGPA,!openGPA)} inline/></b>
                        <Collapse in={openGPA}>
                            <div id='controlGPA'>
                                <Form.Group style={{width: "90%", align: 'center'}}>
                                    Max GPA: {maxGPA}
                                    <Form.Range value = {maxGPA} min="1.0" max="7.0" step="0.1" onChange={(e)=> FilterBound(e.target.value, minGPA, 'lower',  setMaxGPA,  setAlertGPA)}/>
                                    Min GPA: {minGPA}
                                    <Form.Range value = {minGPA} min="1.0" max="7.0" step="0.1" onChange={(e)=> FilterBound(e.target.value, maxGPA, 'upper',  setMinGPA, setAlertGPA)}/>
                                    <Alert show={showAlertGPA} variant='danger'>
                                        <em>Min score</em> <b>cannot be greater than</b> <em>Max score</em>!
                                    </Alert>
                                </Form.Group>
                            </div>
                        </Collapse>

                        <br/>
                        <b><Form.Check label='Credits' type="switch" id="custom-switch-Credits" onChange={()=>updateOpens(setOpenCredits,!openCredits)} inline/></b>
                        <Collapse in={openCredits}>
                            <div id='controlCredits'>
                                <Form.Group style={{width: "90%", align: 'center'}}>
                                    <Form.Label><em>Passed Credits</em></Form.Label><br/>
                                    Max Credits: {maxPassedCredits}
                                    <Form.Range value = {maxPassedCredits} min="0" max="302" onChange={(e)=> FilterBound(e.target.value, minPassedCredits, 'lower',  setMaxPassedCredits,  setAlertPassedCredits)}/>
                                    Min Credits: {minPassedCredits}
                                    <Form.Range value = {minPassedCredits} min="0" max="302" onChange={(e)=> FilterBound(e.target.value, maxPassedCredits, 'upper',  setMinPassedCredits, setAlertPassedCredits)}/>
                                    <Alert show={showAlertPassedCredits} variant='danger'>
                                        <em>Min credit</em> <b>cannot be greater than</b> <em>Max credit</em>!
                                    </Alert>
                                </Form.Group>
                                <br/>
                                <Form.Group style={{width: "90%", align: 'center'}}>
                                    <Form.Label><em>Failed Credits</em></Form.Label><br/>
                                    Max Credits: {maxFailCredits}
                                    <Form.Range value = {maxFailCredits} min="0" max="76" onChange={(e)=> FilterBound(e.target.value, minFailCredits, 'lower',  setMaxFailCredits,  setAlertFailCredits)}/>
                                    Min Credits: {minFailCredits}
                                    <Form.Range value = {minFailCredits} min="0" max="76" onChange={(e)=> FilterBound(e.target.value, maxFailCredits, 'upper',  setMinFailCredits, setAlertFailCredits)}/>
                                    <Alert show={showAlertFailCredits} variant='danger'>
                                        <em>Min credit</em> <b>cannot be greater than</b> <em>Max credit</em>!
                                    </Alert>
                                </Form.Group>
                            </div>
                        </Collapse>
                        
                        <br/>
                        <b><Form.Check label='Professor Rate' type="switch" id="custom-switch-Rate" onChange={()=>updateOpens(setOpenRate,!openRate) } inline/></b>
                        <Collapse in={openRate}>
                            <div id='controlCredits'>
                                <Form.Group style={{width: "90%"}}>
                                    Max Rate: {maxProfRate}
                                    <Form.Range value = {maxProfRate} min="1.0" max="7.0" step="0.1" onChange={(e)=> FilterBound(e.target.value, minProfRate, 'lower',  setMaxProfRate, setAlertProfRate)}/>
                                    Min Rate: {minProfRate}
                                    <Form.Range value = {minProfRate} min="1.0" max="7.0" step="0.1" onChange={(e)=> FilterBound(e.target.value, maxProfRate, 'upper',  setMinProfRate, setAlertProfRate)}/>
                                    <Alert show={showAlertProfRate} variant='danger'>
                                        <em>Min rate</em> <b>cannot be greater than</b> <em>Max rate</em>!
                                    </Alert>
                                </Form.Group>
                            </div>
                        </Collapse>

                        <br/>
                        <b><Form.Check label='Total Warnings' type="switch" id="custom-switch-Warnings" onChange={()=>updateOpens(setOpenWarnings,!openWarnings)} inline/></b>
                        <Collapse in={openWarnings}>
                        <div id='ControlWarnings'>
                                <Form.Group style={{width: "90%"}}>
                                    Max: {maxWarnings}
                                    <Form.Range value = {maxWarnings} min="0" max="6" onChange={(e)=> FilterBound(e.target.value, minWarnings, 'lower',  setMaxWarnings, setAlertWarnings)}/>
                                    Min: {minWarnings}
                                    <Form.Range value = {minWarnings} min="0" max="6" onChange={(e)=> FilterBound(e.target.value, maxWarnings, 'upper',  setMinWarnings, setAlertWarnings)}/>
                                    <Alert show={showAlertWarnings} variant='danger'>
                                        <em>Min</em> <b>cannot be greater than</b> <em>Max</em>!
                                    </Alert>
                                </Form.Group>
                            </div>
                        </Collapse>

                </Card.Body>
                </Card>
                </Col>

                <Col lg={10}>
                    <Row >
                        <Col width={"80%"} inline>
                            <h4>Results {totalResult}</h4>                        
                        </Col>
                        <Col lg='auto'>
                            <Button variant="outline-success" onClick={()=>checkSelection()}>Download CSV</Button>
                            <CSVLink data={dataSelected} filename={'StudentData.csv'} separator={","} className='hidden' ref={cvsLink} target='_blank'></CSVLink>
                        
                        </Col>
                    </Row>
                    <Row>
                    <TableContainer 
                        columns = {columns}
                        data = {dataset}
                        selected = {dataSelected}
                        onRowSelectStateChange={(rows) => updateSelectedRowIds(rows)}
                    />
                    </Row>

                </Col>
            </Row>
        </Container>
        </>
    )
}