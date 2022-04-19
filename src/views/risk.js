import React, {useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Breadcrumb, Card, Col, Alert} from 'react-bootstrap';
import Plot from 'react-plotly.js'
import { CSVLink } from "react-csv";
import STUDENTS from "../assets/student.json";


export const Risk = () => {
    const data = useMemo(() => STUDENTS, [])
    return(
        <>
        <Container fluid style={{paddingLeft: '0px', paddingRight: '0px'}}>
            <Row>
                <Breadcrumb>
                    <Breadcrumb.Item>Risk</Breadcrumb.Item>
                    <Breadcrumb.Item active>Information</Breadcrumb.Item>
                </Breadcrumb>
            </Row>
            <Row>
                <h1>Risk Model Information</h1>
                <p>The <strong>risk</strong> is a score computed by a Random Forest that indicates how likely is the
                student to dropout. The model uses the variables shown in the table plus the accesed by downloading
                the attached csv in this <CSVLink data={data} filename={'StudentData.csv'} separator={","} target='_blank'>link</CSVLink>.</p>
                
                <p>The performance of the model depends on the <em>threshold</em> to select what students are considered
                as <em>Dropout</em>. Given a value to <em>threshold</em>, all students with risk equal or greater to this values
                are treated as <strong>Dropout</strong>, while the lower as <strong>Not Dropout</strong>. Different values to the 
                threshold turns out in different performances. The following section discusses in detail this variation.</p>

                <h2>Dropout Prediction Performance</h2>
                <p> This dashboard provides information to analyze the variation in performance by sensitizing 
                the <em>threshold</em> defining the selected students. Consider the following information for 
                the analysis of the graphs.
                </p>

            </Row>
            <Row>
                <h2>Performance Metrocs</h2>
                <p> Given a value to <em>threshold</em>, the performance metric are computed as following:</p>
            </Row>
            <Row>
                <Col lg={3}>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header><strong>Precision</strong></Card.Header>
                        <Card.Body>
                        {/* <Card.Title>Info Card Title</Card.Title> */}
                            <Card.Text>
                            Portion of targeted as <em>Dropout</em> and are truly <em>Dropout</em>. 
                            This can be understood as the <strong>precision</strong> targeting students
                            as Dropout by using the score and given threshold.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header><strong>Recall</strong></Card.Header>
                        <Card.Body>
                        {/* <Card.Title>Info Card Title</Card.Title> */}
                            <Card.Text>
                            Portion of truly <em>Dropout</em> are targeted as <em>Dropout</em>.
                            In other words, it can be considered as the ability of identifying the truly Dropout students.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card border="info" style={{ width: '18rem' }}>
                        <Card.Header><strong>f1</strong></Card.Header>
                        <Card.Body>
                        {/* <Card.Title>Info Card Title</Card.Title> */}
                            <Card.Text>
                            Harmonic average between <em>precision</em> and <em>recall</em>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}></Col>
            </Row>
            <br/>
            <Row>
                <p>The following chart shows you an estimation of how the three performance metrics
                vary (axis y) given different values of threshold (axis x).</p>
            </Row>
            <Row>
                <Col>
                    <Alert variant='info'>
                    <Alert.Heading>Note</Alert.Heading>
                        <p>Use el selector para seleccionar el nivel de umbral. También se muestra el porcentaje de estudiantes del semestre que sería <em>Seleccionado</em>.</p>
                    </Alert>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col></Col>
                <Col>
                    <Plot
                        data={[
                        {
                            x: ["0.99/0.0%","0.98/0.0%","0.97/0.0%","0.96/0.0%","0.95/0.0%","0.94/0.0%","0.93/0.0%","0.92/0.0%","0.91/0.0%","0.9/0.0%","0.89/0.0%","0.88/0.0%","0.87/0.0%","0.86/0.0%","0.85/0.0%","0.84/0.0%","0.83/0.1%","0.82/0.2%","0.81/0.3%","0.8/0.4%","0.79/0.6%","0.78/0.9%","0.77/1.1%","0.76/1.5%","0.75/1.9%","0.74/2.3%","0.73/2.7%","0.72/3.2%","0.71/3.6%","0.7/4.1%","0.69/4.6%","0.68/5.1%","0.67/5.5%","0.66/6.3%","0.65/6.9%","0.64/7.6%","0.63/8.3%","0.62/8.9%","0.61/9.8%","0.6/10.5%","0.59/11.2%","0.58/12.1%","0.57/12.8%","0.56/13.4%","0.55/14.3%","0.54/15.0%","0.53/16.0%","0.52/16.8%","0.51/17.9%","0.5/18.8%","0.49/19.5%","0.48/20.5%","0.47/21.6%","0.46/22.8%","0.45/23.8%","0.44/24.9%","0.43/26.1%","0.42/27.2%","0.41/28.4%","0.4/29.5%","0.39/30.9%","0.38/32.1%","0.37/33.3%","0.36/34.4%","0.35/35.6%","0.34/36.8%","0.33/38.1%","0.32/39.4%","0.31/40.7%","0.3/41.9%","0.29/43.0%","0.28/44.5%","0.27/45.6%","0.26/46.9%","0.25/48.3%","0.24/49.6%","0.23/51.1%","0.22/52.7%","0.21/54.2%","0.2/55.7%","0.19/57.4%","0.18/59.4%","0.17/61.3%","0.16/63.7%","0.15/66.2%","0.14/68.9%","0.13/71.7%","0.12/74.5%","0.11/77.3%","0.1/80.3%","0.09/83.2%","0.08/86.0%","0.07/89.2%","0.06/92.3%","0.05/95.5%","0.04/97.6%","0.03/99.3%","0.02/99.9%","0.01/100.0%","0.0/100.0%"],
                            y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0023094688221709,0.00459242250287026,0.00912200684150513,0.0248306997742663,0.0420353982300885,0.0563991323210412,0.0741525423728813,0.101449275362318,0.132,0.161849710982658,0.184186046511627,0.211000901713255,0.241110147441457,0.260869565217391,0.287793047696038,0.30256012412723,0.310112359550561,0.322392414296134,0.351633078526754,0.359008707300736,0.374358974358974,0.390634627233518,0.400475341651812,0.406818181818181,0.410087719298245,0.414994720168954,0.42393509127789,0.422549019607843,0.427277062470195,0.433901427913403,0.438698172090949,0.439484978540772,0.437889488990444,0.438049560351718,0.435085007727975,0.434815373021853,0.431900946831755,0.429525483304042,0.42233502538071,0.420223243598161,0.417910447761194,0.409342347879532,0.402141582391433,0.398041474654377,0.394279304542905,0.386154678204434,0.379627198739826,0.373884213210915,0.369062422283014,0.361918604651162,0.35638423412792,0.350080293645331,0.343010272443054,0.340073929115025,0.334749362786745,0.330286663896967,0.324444444444444,0.319477434679334,0.313793770555233,0.307634164777021,0.30186587844079,0.297910662824207,0.292477643345607,0.286350402466175,0.280314433851814,0.274388254486133,0.268122823678379,0.262598243180767,0.255033557046979,0.246902909824258,0.238830897703549,0.230583176565439,0.222944004157463,0.216216216216216,0.209324915007285,0.203011056222065,0.197031963470319,0.190697160534747,0.184935176256294,0.179250181742652,0.175674300254452,0.173067281660483,0.172015148495116,0.171895229558808,0.171895229558808],
                            type: 'line',
                            name: 'f1',
                        },
                        {
                            type: 'line', 
                            x: ["0.99/0.0%","0.98/0.0%","0.97/0.0%","0.96/0.0%","0.95/0.0%","0.94/0.0%","0.93/0.0%","0.92/0.0%","0.91/0.0%","0.9/0.0%","0.89/0.0%","0.88/0.0%","0.87/0.0%","0.86/0.0%","0.85/0.0%","0.84/0.0%","0.83/0.1%","0.82/0.2%","0.81/0.3%","0.8/0.4%","0.79/0.6%","0.78/0.9%","0.77/1.1%","0.76/1.5%","0.75/1.9%","0.74/2.3%","0.73/2.7%","0.72/3.2%","0.71/3.6%","0.7/4.1%","0.69/4.6%","0.68/5.1%","0.67/5.5%","0.66/6.3%","0.65/6.9%","0.64/7.6%","0.63/8.3%","0.62/8.9%","0.61/9.8%","0.6/10.5%","0.59/11.2%","0.58/12.1%","0.57/12.8%","0.56/13.4%","0.55/14.3%","0.54/15.0%","0.53/16.0%","0.52/16.8%","0.51/17.9%","0.5/18.8%","0.49/19.5%","0.48/20.5%","0.47/21.6%","0.46/22.8%","0.45/23.8%","0.44/24.9%","0.43/26.1%","0.42/27.2%","0.41/28.4%","0.4/29.5%","0.39/30.9%","0.38/32.1%","0.37/33.3%","0.36/34.4%","0.35/35.6%","0.34/36.8%","0.33/38.1%","0.32/39.4%","0.31/40.7%","0.3/41.9%","0.29/43.0%","0.28/44.5%","0.27/45.6%","0.26/46.9%","0.25/48.3%","0.24/49.6%","0.23/51.1%","0.22/52.7%","0.21/54.2%","0.2/55.7%","0.19/57.4%","0.18/59.4%","0.17/61.3%","0.16/63.7%","0.15/66.2%","0.14/68.9%","0.13/71.7%","0.12/74.5%","0.11/77.3%","0.1/80.3%","0.09/83.2%","0.08/86.0%","0.07/89.2%","0.06/92.3%","0.05/95.5%","0.04/97.6%","0.03/99.3%","0.02/99.9%","0.01/100.0%","0.0/100.0%"], 
                            y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.00115874855156431,0.00231749710312862,0.00463499420625724,0.0127462340672074,0.0220162224797219,0.030127462340672,0.0405561993047508,0.0567786790266512,0.0764774044032444,0.097334878331402,0.114716106604866,0.135573580533024,0.161066048667439,0.180764774044032,0.206257242178447,0.22595596755504,0.239860950173812,0.256083429895712,0.29316338354577,0.310544611819235,0.338354577056778,0.367323290845886,0.390498261877172,0.414831981460023,0.433371958285052,0.455388180764774,0.484356894553881,0.499420625724217,0.519119351100811,0.54577056778679,0.57010428736964,0.593279258400927,0.610660486674391,0.634994206257242,0.652375434530706,0.668597914252607,0.687137891077636,0.707995365005793,0.723059096176129,0.741599073001158,0.762456546929316,0.77172653534183,0.783314020857473,0.800695249130938,0.81460023174971,0.827346465816917,0.837775202780996,0.849362688296639,0.859791425260718,0.86558516801854,0.874855156431054,0.884125144843569,0.88991888760139,0.90614136732329,0.913093858632676,0.921205098493626,0.930475086906141,0.935110081112398,0.939745075318655,0.943221320973348,0.946697566628041,0.958285052143684,0.966396292004635,0.968713789107763,0.971031286210892,0.974507531865585,0.981460023174971,0.987253765932792,0.990730011587485,0.993047508690614,0.994206257242178,0.994206257242178,0.994206257242178,0.996523754345307,0.998841251448435,1,1,1,1,1,1,1,1,1,1],
                            name: 'recall',
                        },
                        {
                            type: 'line',
                            x: ["0.99/0.0%","0.98/0.0%","0.97/0.0%","0.96/0.0%","0.95/0.0%","0.94/0.0%","0.93/0.0%","0.92/0.0%","0.91/0.0%","0.9/0.0%","0.89/0.0%","0.88/0.0%","0.87/0.0%","0.86/0.0%","0.85/0.0%","0.84/0.0%","0.83/0.1%","0.82/0.2%","0.81/0.3%","0.8/0.4%","0.79/0.6%","0.78/0.9%","0.77/1.1%","0.76/1.5%","0.75/1.9%","0.74/2.3%","0.73/2.7%","0.72/3.2%","0.71/3.6%","0.7/4.1%","0.69/4.6%","0.68/5.1%","0.67/5.5%","0.66/6.3%","0.65/6.9%","0.64/7.6%","0.63/8.3%","0.62/8.9%","0.61/9.8%","0.6/10.5%","0.59/11.2%","0.58/12.1%","0.57/12.8%","0.56/13.4%","0.55/14.3%","0.54/15.0%","0.53/16.0%","0.52/16.8%","0.51/17.9%","0.5/18.8%","0.49/19.5%","0.48/20.5%","0.47/21.6%","0.46/22.8%","0.45/23.8%","0.44/24.9%","0.43/26.1%","0.42/27.2%","0.41/28.4%","0.4/29.5%","0.39/30.9%","0.38/32.1%","0.37/33.3%","0.36/34.4%","0.35/35.6%","0.34/36.8%","0.33/38.1%","0.32/39.4%","0.31/40.7%","0.3/41.9%","0.29/43.0%","0.28/44.5%","0.27/45.6%","0.26/46.9%","0.25/48.3%","0.24/49.6%","0.23/51.1%","0.22/52.7%","0.21/54.2%","0.2/55.7%","0.19/57.4%","0.18/59.4%","0.17/61.3%","0.16/63.7%","0.15/66.2%","0.14/68.9%","0.13/71.7%","0.12/74.5%","0.11/77.3%","0.1/80.3%","0.09/83.2%","0.08/86.0%","0.07/89.2%","0.06/92.3%","0.05/95.5%","0.04/97.6%","0.03/99.3%","0.02/99.9%","0.01/100.0%","0.0/100.0%"], 
                            y: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.333333333333333,0.25,0.285714285714285,0.478260869565217,0.463414634146341,0.440677966101694,0.432098765432098,0.475728155339805,0.481751824817518,0.48,0.466981132075471,0.47560975609756,0.479310344827586,0.468468468468468,0.475935828877005,0.457746478873239,0.438559322033898,0.43503937007874,0.439236111111111,0.425396825396825,0.418938307030129,0.417105263157894,0.410975609756097,0.399108138238573,0.389177939646201,0.381183317167798,0.376916140667267,0.366185216652506,0.363047001620745,0.360091743119266,0.356521739130434,0.349011588275391,0.341321243523316,0.334350213544844,0.326376811594202,0.32216638749302,0.314922995220392,0.308274470232088,0.298279158699808,0.293174530462666,0.287839020122484,0.278544542032622,0.270508203281312,0.264852433882713,0.260081391046984,0.251851851851851,0.245417515274949,0.239699149771092,0.234958834705509,0.228790199081163,0.223770005927682,0.21824942791762,0.212448132780082,0.209314775160599,0.204941482444733,0.201214882308276,0.196476633227306,0.192647409883026,0.188341848583372,0.183788665613005,0.179560439560439,0.176370228193644,0.172314049586776,0.168006430868167,0.163799843627834,0.159673438389975,0.155270394133822,0.151439744045503,0.14635398836015,0.140977134397104,0.135716545397026,0.130414956680346,0.125548726953467,0.12126339537507,0.11691306116913,0.112972902212331,0.109282005824996,0.105398143624816,0.101889020070838,0.0984485512206251,0.096295469761214,0.0947310647639956,0.0941009704503325,0.0940292002614948,0.0940292002614948],
                            name: 'precision',
                        }
                        ]}
                        layout={{responisve: true, title: 'Metric Trade-Off'}}
                        
                    />
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
    )
}