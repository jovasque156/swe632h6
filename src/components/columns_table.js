export const columns_student = [
    {
        Header: 'Risk',
        accessor: 'positive_risk',
        width: 50,
        textAlign: 'center',
        tipText: 'Score ranging from 0 to 100 that indicates the risk of leaving the program. Is computed by a model using academic and demographics information.',
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
    
            const pickColor = (value) => {
            let risk = value
            let color = ''
    
            switch (true) {
                case (risk >= 69):
                    color = '#bf2626'
                    break;
                case (risk >= 33):
                    color = '#32a94c'
                    break;
                default:
                    color = '#14a9ff'
                    break
            }
            return color;
            };
    
            return (
            <div style={{ textAlign: 'center'}}>
                <b><font color= {pickColor(value)}>{value}</font></b>
            </div>
            );
        },
        },  
        {
        Header: 'ID',
        accessor: 'id_student',
        textAlign: 'center',
        tipText: 'Identifier of student composed by a unique number and the year of entry',
        // minWidth: 100,
        width: 100,
        // maxWidth: 120,
        // collapse: true,
        disableResizing: true,
        },
        
        {
        Header: 'Full Name',
        accessor: 'full_name',
        textAlign: 'center',
        tipText: 'First and last Name',
        // minWidth: 140,
        width: 140,
        // maxWidth: 160,
        disableResizing: true,
        },
        {
        Header: 'email',
        accessor: 'email',
        textAlign: 'center',
        tipText: 'Personal email to contact the student',
        // minWidth: 100,
        width: 100,
        // maxWidth: 160,
        disableResizing: true,
        },
        {
        Header: 'Program',
        accessor: 'program',
        textAlign: 'center',
        tipText: 'Bachelor program in which the student is enrolled',
        width: 60,
        // collapse: true,
        disableResizing: true,
        },
        {
        Header: 'Year Entry',
        accessor: 'year_entry',
        textAlign: 'center',
        tipText: 'Year of entry to the program',
        // minWidth: 70,
        width: 70,
        // maxWidth: 90,
        // collapse: true,
        disableResizing: true,
        },
    
        {
        Header: 'Gender',
        accessor: 'Genero',
        textAlign: 'center',
        tipText: 'Gender. There are only two groups: Males and Females',
        // minWidth: 90,
        width: 90,
        // maxWidth: 110,
        disableResizing: true,
        },
        
        {
        Header: 'SAT Math',
        accessor: 'SAT_Math',
        tipText: 'SAT score in Math section. Max score 850.',
        // minWidth: 70,
        width: 50,
        // maxWidth: 90,
        // collapse: true,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
    
        {
        Header: 'SAT Verbal',
        accessor: 'SAT_Verbal',
        tipText: 'SAT score in Verbal section. Max score 850.',
        // minWidth: 70,
        width: 50,
        // maxWidth: 90,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
    
        {
        Header: 'GPA High School',
        accessor: 'GPA_high_school',
        tipText: 'GPA in high school.',
        // minWidth: 70,
        width: 70,
        // maxWidth: 90,
        // collapse: true,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
    
        {
        Header: 'Passed Credits',
        accessor: 'passed_credits',
        tipText: 'Cumulative total of passed credits to date',
        // minWidth: 80,
        width: 70,
        // maxWidth: 100,
        // collapse: true,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
        
        {
        Header: 'Failed Credits',
        accessor: 'failed_credits',
        tipText: 'Cumulative total of failed credits to date',
        // minWidth: 70,
        width: 70,
        // maxWidth: 90,
        // collapse: true,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
        
        {
        Header: 'Professor Rate',
        accessor: 'professor_rate',
        tipText: 'Average professor rate made by the student of the teachers who have given him/her classes',
        // width: 70,
        width: 70,
        // maxWidth: 90,
        disableResizing: true,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
    
        {
        Header: '#Academic Warnings',
        accessor: 'total_prev_warnings',
        tipText: 'Total of academic warnings received by the student.',
        // minWidth: 70,
        width: 80,
        // maxWidth: 120,
        // collapse: true,
        disableResizing: false,
        Cell: ({ cell }) => {
            const { value } = cell;
            return (
            <div style={{ textAlign: 'center' }}>
                {value}
            </div>
            );
        },
        },
        
    ]  