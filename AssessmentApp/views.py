from django.shortcuts import render
import pandas as pd
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class BookingViewSet(APIView):

    def post(self, request, *args, **kwargs):
        array = []
        file = request.FILES['file']
        if not file.name.endswith('.csv'):
            return Response({'error': 'This is not a CSV file'}, status=400)

        try:
            # Read the CSV file
            df = pd.read_csv(file)

            # Get pagination parameters from the request
            page = int(request.GET.get('page', 1))  # Default page is 1
            page_size = int(request.GET.get('page_size', 100))  # Default page size is 100
            start_row = (page - 1) * page_size
            end_row = page * page_size

            # Filter data for the current page
            paginated_df = df.iloc[start_row:end_row]

            # Process each row in the current page
            for index, row in paginated_df.iterrows():
                try:
                    array.append({
                        'school_name': row['school_name'],
                        'year': row.get('year', ''),
                        'StudentID': row.get('StudentID', ''),
                        'first_name': row.get('First Name', ''),
                        'last_name': row.get('Last Name', ''),
                        'year_level': row.get('Year Level', ''),
                        'Class': row.get('Class', ''),
                        'Subject': row.get('StudentID', ''),
                        'Answers': row.get('Answers', ''),
                        'Correct_Answers': row.get('Correct Answers', ''),
                        'Question_Number': row.get('Question Number', ''),
                        'Subject_Contents': row.get('Subject Contents', ''),
                        'Assessment_Areas': row.get('Assessment Areas', ''),
                        'sydney_correct_count_percentage': row.get('sydney_correct_count_percentage', ''),
                        'sydney_average_score': row.get('sydney_average_score', ''),
                        'sydney_participants': row.get('sydney_participants', ''),
                        'student_score': row.get('student_score', ''),
                        'student_total_assessed': row.get('student_total_assessed', ''),
                        'student_area_assessed_score': row.get('student_area_assessed_score', ''),
                        'total_area_assessed_score': row.get('total_area_assessed_score', ''),
                        'participant': row.get('participant', ''),
                        'correct_answer_percentage_per_class': row.get('correct_answer_percentage_per_class', ''),
                        'average_score': row.get('average_score', ''),
                        'school_percentile': row.get('school_percentile', ''),
                        'sydney_percentile': row.get('sydney_percentile', ''),
                        'strength_status': row.get('strength_status', ''),
                        'high_distinct_count': row.get('high_distinct_count', ''),
                        'distinct_count': row.get('distinct_count', ''),
                        'credit_count': row.get('credit_count', ''),
                        'participant_count': row.get('participant_count', ''),
                        'award': row.get('award', ''),
                    })
                except Exception as e:
                    return Response({'error': f'Error processing row {index}: {str(e)}'}, status=400)

            # Metadata for pagination
            total_rows = len(df)
            total_pages = (total_rows // page_size) + (1 if total_rows % page_size else 0)

            return Response({
                'message': array,
                'pagination': {
                    'current_page': page,
                    'total_pages': total_pages,
                    'total_rows': total_rows,
                    'page_size': page_size
                }
            }, status=200)

        except Exception as e:
            return Response({'error': str(e)}, status=400)